'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useHistory, type HistoryItem } from '@/hooks/use-history';
import { CareerRoadmap } from '@/components/career-roadmap';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, AlertCircle, Compass } from 'lucide-react';

export default function HistoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();
  const { getHistoryItem } = useHistory();
  const [item, setItem] = useState<HistoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getHistoryItem(id)
      .then((data) => {
        if (isMounted) {
          if (data && data.roadmapDetails) {
            setItem(data);
          } else {
            setError('Roadmap could not be located in your history.');
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load roadmap.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, getHistoryItem]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] space-y-4 animate-mast-arrive">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-xs text-muted-foreground">Loading saved roadmap simulation...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-4 animate-mast-arrive">
        <Card className="max-w-md w-full text-center border-border/80 bg-card/90 shadow-xl">
          <CardHeader>
            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-3">
              <AlertCircle size={28} />
            </div>
            <CardTitle className="font-headline text-2xl font-bold">Simulation Not Found</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              {error || 'This saved simulation may have been cleared or belongs to a different browser session.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button asChild variant="outline" size="sm" className="w-full sm:w-auto text-xs">
              <Link href="/history">
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to History
              </Link>
            </Button>
            <Button asChild size="sm" className="w-full sm:w-auto text-xs">
              <Link href="/">
                <Compass className="mr-1.5 h-3.5 w-3.5" /> Launch New
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="animate-mast-arrive">
      <CareerRoadmap
        data={item.roadmapDetails}
        userInput={{
          desiredCareer: item.generatedCareer,
          interests: item.aiPrompt,
        }}
        studentProfile={item.studentProfile}
        onReset={() => router.push('/history')}
        onViewOpportunities={() => router.push('/')}
        onBackToRoleSelection={() => router.push('/history')}
      />
    </div>
  );
}
