'use client';

import { useState } from 'react';
import { ReportCard } from './report-card';
import { ReportForm } from './report-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import type { CommunityReport } from '@/lib/types';
import { PlusCircle, ShieldQuestion } from 'lucide-react';

const initialReports: CommunityReport[] = [
    { id: 'rep1', type: 'Noise Complaint', location: '123 Maple St, Apt 4B', description: 'Extremely loud music playing after midnight for the third night in a row. It is affecting my sleep.', priority: 'Medium', reason: 'The report indicates a recurring issue affecting quality of life, but no immediate danger, so it is marked as Medium priority.' },
    { id: 'rep2', type: 'Illegal Dumping', location: 'Alley behind Oak Ave', description: 'Someone left a large mattress and bags of trash in the alleyway, creating a hazard.', priority: 'Low', reason: 'This is a minor issue that does not pose an immediate threat, so it is marked as Low priority.'},
];

export function CommunityReports() {
  const [reports, setReports] = useState<CommunityReport[]>(initialReports);
  const [isFormOpen, setFormOpen] = useState(false);

  const handleReportSubmit = (newReport: CommunityReport) => {
    setReports(prevReports => [newReport, ...prevReports]);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-lg border">
        <div className="flex-1">
            <h2 className="font-headline text-lg font-semibold flex items-center gap-2"><ShieldQuestion /> Report a Concern</h2>
            <p className="text-muted-foreground text-sm mt-1">Anonymously report disturbances or issues in your community. Your report will be analyzed by AI to determine its priority.</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setFormOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
              <PlusCircle className="mr-2 h-4 w-4" /> File a Report
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-headline">File an Anonymous Report</DialogTitle>
              <DialogDescription>
                Your identity will remain confidential. Please provide as much detail as possible.
              </DialogDescription>
            </DialogHeader>
            <ReportForm setOpen={setFormOpen} onReportSubmit={handleReportSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <h3 className="font-headline text-xl font-semibold">Recent Reports</h3>
        {reports.length > 0 ? (
            reports.map(report => <ReportCard key={report.id} report={report} />)
        ) : (
            <div className="text-center py-10 bg-card rounded-lg border">
                <p className="text-muted-foreground">No reports have been filed yet.</p>
            </div>
        )}
      </div>
    </div>
  );
}
