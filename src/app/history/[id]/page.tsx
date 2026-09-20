'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { useHistory, type HistoryItem } from '@/hooks/use-history';
import { CareerRoadmap } from '@/components/career-roadmap';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, AlertCircle } from 'lucide-react';

export default function HistoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { getHistoryItem } = useHistory();
  const [item, setItem] = useState<HistoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    getHistoryItem(id)
      .then((data) => {
        if (isMounted) {
          if (data) {
            setItem(data);
          } else {
            setError('Roadmap not found in your history.');
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError('Failed to load roadmap.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, user, authLoading, getHistoryItem]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Access Denied</CardTitle>
            <CardDescription>Please sign in to view this roadmap.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center border-destructive">
          <CardHeader>
            <div className="mx-auto bg-destructive/10 text-destructive p-3 rounded-full w-fit mb-4">
              <AlertCircle size={32} />
            </div>
            <CardTitle className="font-headline text-2xl text-destructive">Not Found</CardTitle>
            <CardDescription>{error || 'This saved roadmap could not be found.'}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/history">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to History
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <CareerRoadmap
      data={item.roadmapDetails}
      userInput={{
        desiredCareer: item.generatedCareer,
        interests: item.aiPrompt,
      }}
      onReset={() => router.push('/history')}
      onViewOpportunities={() => router.push('/')}
      onBackToRoleSelection={() => router.push('/history')}
    />
  );
}
