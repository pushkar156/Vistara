'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useFirebaseFirestore } from '@/firebase';
import { collection, query, onSnapshot, orderBy, addDoc, serverTimestamp, doc, getDoc, deleteDoc } from 'firebase/firestore';
import type { CareerPathOutput } from '@/ai/flows/career-path-generator';
import type { StudentProfile } from '@/types/student-profile';
import { getPresetSimulationById } from '@/lib/preset-simulations';

export interface HistoryItem {
  id: string;
  generatedCareer: string;
  roadmapDetails: CareerPathOutput;
  aiPrompt: string;
  studentProfile?: StudentProfile;
  timestamp: Date;
  isLocal?: boolean;
}

export type HistoryItemForSaving = Omit<HistoryItem, 'id' | 'timestamp'> & {
  id?: string;
  timestamp?: Date;
};

const LOCAL_STORAGE_KEY = 'vistara_career_history';

// Safe localStorage readers and writers
function getLocalHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item: any) => ({
      ...item,
      timestamp: item.timestamp ? new Date(item.timestamp) : new Date(),
      isLocal: true,
    }));
  } catch (e) {
    console.error('Failed to read local history:', e);
    return [];
  }
}

function saveLocalHistory(items: HistoryItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to write local history:', e);
  }
}

export function useHistory() {
  const { user } = useAuth();
  const firestore = useFirebaseFirestore();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sync and load history
  useEffect(() => {
    // 1. Always load local history immediately for instant UX
    const localItems = getLocalHistory();
    setHistory(localItems);
    setLoading(false);

    // 2. If user is logged in and firestore is available, sync with cloud
    if (!user || !firestore) {
      return;
    }

    let unsubscribe = () => {};

    try {
      const historyCollectionRef = collection(firestore, 'users', user.uid, 'history');
      const q = query(historyCollectionRef, orderBy('timestamp', 'desc'));

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const cloudData: HistoryItem[] = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
            timestamp: docSnap.data().timestamp?.toDate() || new Date(),
            isLocal: false,
          } as HistoryItem));

          // Merge cloud data with local items (deduplicating by generatedCareer or id)
          const localMap = new Map(localItems.map((item) => [item.id, item]));
          const combined = [...cloudData];
          
          localItems.forEach((localItem) => {
            const existsInCloud = cloudData.some(
              (c) => c.id === localItem.id || (c.generatedCareer === localItem.generatedCareer && Math.abs(new Date(c.timestamp).getTime() - new Date(localItem.timestamp).getTime()) < 60000)
            );
            if (!existsInCloud) {
              combined.push(localItem);
            }
          });

          // Sort descending by timestamp
          combined.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

          setHistory(combined);
          setError(null);
          setLoading(false);
        },
        (err) => {
          console.warn('Firestore history subscription note (falling back to local storage):', err.message);
          // If firestore rules deny or offline, fallback smoothly to local history
          setHistory(localItems);
          setLoading(false);
        }
      );
    } catch (e) {
      console.warn('Error setting up firestore history listener:', e);
      setHistory(localItems);
      setLoading(false);
    }

    return () => unsubscribe();
  }, [user, firestore]);

  // Add history item (saves locally and optionally to firestore)
  const addHistoryItem = useCallback(
    async (item: HistoryItemForSaving): Promise<string> => {
      const generatedId = item.id || `hist_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const timestamp = item.timestamp || new Date();

      const newItem: HistoryItem = {
        ...item,
        id: generatedId,
        timestamp,
        isLocal: true,
      };

      // 1. Immediately persist locally
      const currentLocal = getLocalHistory();
      // Remove any duplicate of same career generated within last 5 seconds
      const filtered = currentLocal.filter((h) => h.id !== generatedId);
      const updated = [newItem, ...filtered];
      saveLocalHistory(updated);

      // Update state immediately
      setHistory((prev) => {
        const withoutOld = prev.filter((p) => p.id !== generatedId);
        return [newItem, ...withoutOld];
      });

      // 2. If logged in, also asynchronously push to cloud
      if (user && firestore) {
        try {
          const historyCollectionRef = collection(firestore, 'users', user.uid, 'history');
          addDoc(historyCollectionRef, {
            ...item,
            timestamp: serverTimestamp(),
          }).catch((err) => {
            console.warn('Cloud sync skipped, preserved in local storage:', err.message);
          });
        } catch (err) {
          console.warn('Cloud write failed, preserved in local storage:', err);
        }
      }

      return generatedId;
    },
    [user, firestore]
  );

  // Delete history item
  const deleteHistoryItem = useCallback(
    async (itemId: string) => {
      // 1. Remove from local storage
      const currentLocal = getLocalHistory();
      const updated = currentLocal.filter((h) => h.id !== itemId);
      saveLocalHistory(updated);

      // Update local state
      setHistory((prev) => prev.filter((h) => h.id !== itemId));

      // 2. If logged in, remove from firestore
      if (user && firestore) {
        try {
          const docRef = doc(firestore, 'users', user.uid, 'history', itemId);
          await deleteDoc(docRef);
        } catch (err) {
          console.warn('Could not delete from cloud:', err);
        }
      }
    },
    [user, firestore]
  );

  // Get single history item by id
  const getHistoryItem = useCallback(
    async (itemId: string): Promise<HistoryItem | null> => {
      // 1. Check local storage first (instant response)
      const currentLocal = getLocalHistory();
      const localFound = currentLocal.find((h) => h.id === itemId);
      if (localFound) {
        return localFound;
      }

      // 2. Check current state
      const stateFound = history.find((h) => h.id === itemId);
      if (stateFound) {
        return stateFound;
      }

      // 3. Query firestore if authenticated
      if (user && firestore) {
        try {
          const docRef = doc(firestore, 'users', user.uid, 'history', itemId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            return {
              id: docSnap.id,
              ...docSnap.data(),
              timestamp: docSnap.data().timestamp?.toDate() || new Date(),
              isLocal: false,
            } as HistoryItem;
          }
        } catch (err) {
          console.warn('Could not fetch from Firestore, checking preset fallback:', err);
        }
      }

      // 4. Fallback check for demo presets if someone accesses sample IDs
      const demoSimulation = getPresetSimulationById(itemId);
      if (demoSimulation) {
        const title = demoSimulation.pathways?.[0]?.degreeAwarded || demoSimulation.pathways?.[0]?.pathwayTitle || 'Computer Science & AI Engineering';
        return {
          id: itemId,
          generatedCareer: title,
          roadmapDetails: demoSimulation,
          aiPrompt: `Demo Simulation: ${title}`,
          timestamp: new Date(),
          isLocal: true,
        };
      }

      return null;
    },
    [user, firestore, history]
  );

  // Seed a demo item to test history instantly
  const seedDemoHistory = useCallback(async () => {
    const demo = getPresetSimulationById('aarav') || getPresetSimulationById('ananya');
    if (demo) {
      const title = demo.pathways?.[0]?.degreeAwarded || demo.pathways?.[0]?.pathwayTitle || 'Computer Science & Artificial Intelligence';
      await addHistoryItem({
        generatedCareer: title,
        roadmapDetails: demo,
        aiPrompt: `Class 10 Demo Intake: ${title}`,
      });
    }
  }, [addHistoryItem]);

  return {
    history,
    loading,
    error,
    addHistoryItem,
    deleteHistoryItem,
    getHistoryItem,
    seedDemoHistory,
  };
}
