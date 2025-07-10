import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CommunityReport } from '@/lib/types';
import { MapPin, AlertTriangle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const priorityVariantMap: Record<CommunityReport['priority'], 'destructive' | 'secondary' | 'outline'> = {
  High: 'destructive',
  Medium: 'secondary',
  Low: 'outline',
};

export function ReportCard({ report }: { report: CommunityReport }) {
  const badgeVariant = priorityVariantMap[report.priority] ?? 'outline';

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2">
          <div className="flex-1">
            <CardTitle className="font-headline text-lg">{report.type}</CardTitle>
            <CardDescription className="flex items-center gap-2 pt-1">
              <MapPin className="w-4 h-4" /> {report.location}
            </CardDescription>
          </div>
          <Badge variant={badgeVariant} className="whitespace-nowrap py-1 px-3 w-fit sm:w-auto">
            <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
            {report.priority} Priority
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{report.description}</p>
        <div className={cn(
            "text-xs p-3 rounded-md border",
            report.priority === 'High' && 'bg-destructive/10 border-destructive/20 text-destructive-foreground',
            report.priority === 'Medium' && 'bg-secondary/50 border-secondary text-secondary-foreground',
            report.priority === 'Low' && 'bg-muted/50 border-muted text-muted-foreground'
        )}>
          <p className="font-bold flex items-center gap-1.5 mb-1"><Sparkles className="w-3.5 h-3.5" />AI Analysis</p>
          <p>{report.reason}</p>
        </div>
      </CardContent>
    </Card>
  );
}
