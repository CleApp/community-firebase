'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { ReportSchema } from '@/lib/schemas';
import type { CommunityReport } from '@/lib/types';
import { submitDisturbanceReport } from '@/app/actions';
import { useToast } from "@/hooks/use-toast"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ReportFormProps = {
  setOpen: (open: boolean) => void;
  onReportSubmit: (report: CommunityReport) => void;
};

const initialState = { message: '', errors: {} };

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Submitting..." : "Submit Report"}
        </Button>
    )
}

export function ReportForm({ setOpen, onReportSubmit }: ReportFormProps) {
  const [state, formAction] = useFormState(submitDisturbanceReport, initialState);
  const { toast } = useToast()

  useEffect(() => {
    if (state.message && !state.errors) {
      toast({
        title: "Success",
        description: state.message,
        variant: "default",
      })
      if (state.report) {
        onReportSubmit(state.report);
      }
      setOpen(false);
    } else if (state.message && state.errors) {
       toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      })
    }
  }, [state, onReportSubmit, setOpen, toast]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="type">Type of Disturbance</Label>
        <Select name="type" required>
            <SelectTrigger id="type" aria-label="Report Type">
                <SelectValue placeholder="Select a type..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Noise Complaint">Noise Complaint</SelectItem>
                <SelectItem value="Vandalism">Vandalism</SelectItem>
                <SelectItem value="Illegal Dumping">Illegal Dumping</SelectItem>
                <SelectItem value="Public Disturbance">Public Disturbance</SelectItem>
                <SelectItem value="Safety Hazard">Safety Hazard</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
        </Select>
        {state?.errors?.type && <p className="text-sm font-medium text-destructive">{state.errors.type[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" placeholder="e.g., 'Corner of Main St & 1st Ave'" required />
        {state?.errors?.location && <p className="text-sm font-medium text-destructive">{state.errors.location[0]}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" placeholder="Describe the issue in detail. If urgent, mention keywords like 'emergency' or 'danger'." required />
        {state?.errors?.description && <p className="text-sm font-medium text-destructive">{state.errors.description[0]}</p>}
      </div>
      
      <SubmitButton />
    </form>
  );
}
