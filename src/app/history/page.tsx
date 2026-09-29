'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { useHistory } from '@/hooks/use-history';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  History, 
  Clock, 
  ArrowRight, 
  User, 
  Search, 
  Loader2, 
  Trash2, 
  Sparkles, 
  Compass, 
  ExternalLink,
  ShieldCheck,
  Zap,
  FolderOpen
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function HistoryPage() {
  const { user, loading: authLoading } = useAuth();
  const { history, loading: historyLoading, error, deleteHistoryItem, seedDemoHistory } = useHistory();
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  const handleDelete = async (id: string, career: string) => {
    setDeletingId(id);
    try {
      await deleteHistoryItem(id);
      toast({
        title: 'Roadmap Removed',
        description: `Removed "${career}" from your history.`,
      });
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Delete Failed',
        description: err.message || 'Could not delete item.',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleSeedDemo = async () => {
    setIsSeeding(true);
    try {
      await seedDemoHistory();
      toast({
        title: 'Demo Simulation Added',
        description: 'Loaded Computer Science & Artificial Intelligence simulation into history.',
      });
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Could not load demo',
        description: e.message || 'Error creating demo roadmap.',
      });
    } finally {
      setIsSeeding(false);
    }
  };

  if (authLoading && historyLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-xs text-muted-foreground">Loading your simulation logs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10 animate-mast-arrive">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Page Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <History className="h-3.5 w-3.5" />
              <span>Simulation Records</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-headline font-bold text-foreground">
              Career & Pathway History
            </h1>
            <p className="text-sm text-muted-foreground">
              Review your past simulations, compare stream branches, and revisit financial ROI briefings.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {history.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSeedDemo}
                disabled={isSeeding}
                className="text-xs h-9 gap-1.5 border-border/70"
              >
                {isSeeding ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5 text-primary" />}
                <span>Add Sample</span>
              </Button>
            )}
            <Button size="sm" asChild className="text-xs h-9 gap-1.5 shadow-sm shadow-primary/20">
              <Link href="/">
                <Compass className="h-3.5 w-3.5" />
                <span>New Simulation</span>
              </Link>
            </Button>
          </div>
        </header>

        {/* User Account / Storage Status Note */}
        <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-card/60 border border-border/50 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {user ? (
                <>Cloud Sync Active for <strong>{user.email}</strong></>
              ) : (
                <>Device Storage Active • Saved locally on this browser</>
              )}
            </span>
          </div>

          {!user && (
            <Link href="/login" className="text-primary hover:underline font-medium text-xs">
              Sign in to sync across devices →
            </Link>
          )}
        </div>

        {/* Empty State */}
        {history.length === 0 ? (
          <Card className="text-center p-8 sm:p-12 border-dashed border-border/70 bg-card/50">
            <CardHeader className="space-y-3">
              <div className="mx-auto bg-primary/10 text-primary p-4 rounded-2xl w-fit shadow-inner">
                <FolderOpen className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl font-bold">No History Records Yet</CardTitle>
              <CardDescription className="max-w-md mx-auto text-xs sm:text-sm">
                You haven't run any career simulations yet. Take the Class 10 profile questionnaire or load an instant sample to see how it works!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button asChild size="lg" className="w-full sm:w-auto text-xs font-semibold gap-2">
                <Link href="/">
                  <Compass className="h-4 w-4" />
                  Start Profile Intake
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleSeedDemo}
                disabled={isSeeding}
                className="w-full sm:w-auto text-xs font-semibold gap-2 border-border/80"
              >
                {isSeeding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-primary" />}
                Load Sample Simulation
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* History Items List */
          <main className="space-y-4">
            {history.map((item) => (
              <Card 
                key={item.id} 
                className="hover:shadow-lg hover:border-primary/40 transition-all border-border/60 bg-card/85 backdrop-blur-sm group"
              >
                <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-headline text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.generatedCareer}
                      </h3>
                      {item.isLocal ? (
                        <Badge variant="outline" className="text-[10px] border-border/50 text-muted-foreground font-normal">
                          Local Device
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[10px] font-normal text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                          Cloud Synced
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-primary/70" />
                        <span>
                          {item.timestamp ? new Date(item.timestamp).toLocaleString(undefined, {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                          }) : 'Recent'}
                        </span>
                      </div>

                      {item.roadmapDetails?.pathways && (
                        <span>
                          • {item.roadmapDetails.pathways.length} branches simulated
                        </span>
                      )}

                      {item.studentProfile && (
                        <span>
                          • Student: {item.studentProfile.studentName} ({item.studentProfile.class10Board} {item.studentProfile.class10Percentage}%)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      disabled={deletingId === item.id}
                      onClick={() => handleDelete(item.id, item.generatedCareer)}
                      className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      title="Delete roadmap"
                    >
                      {deletingId === item.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>

                    <Button variant="default" size="sm" asChild className="h-9 px-4 gap-2 text-xs font-semibold shadow-xs">
                      <Link href={`/history/${item.id}`}>
                        <span>View Roadmap</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </main>
        )}
      </div>
    </div>
  );
}
