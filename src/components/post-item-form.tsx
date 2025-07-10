'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { PostItemSchema } from '@/lib/schemas';
import type { LostAndFoundItem } from '@/lib/types';
import { submitLostAndFoundItem } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type PostItemFormProps = {
  type: 'lost' | 'found';
  setOpen: (open: boolean) => void;
  onPostItem: (item: LostAndFoundItem) => void;
};

const initialState = { message: '', errors: {} };

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Submitting..." : "Submit"}
        </Button>
    )
}

export function PostItemForm({ type, setOpen, onPostItem }: PostItemFormProps) {
  const [state, formAction] = useFormState(submitLostAndFoundItem, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && !state.errors) {
      toast({
        title: "Success",
        description: state.message,
        variant: "default",
      })
      if (state.item) {
        onPostItem(state.item);
      }
      setOpen(false);
    } else if (state.message && state.errors) {
       toast({
        title: "Error",
        description: "Please correct the errors and try again.",
        variant: "destructive",
      })
    }
  }, [state, onPostItem, setOpen, toast]);

  return (
      <form ref={formRef} action={formAction} className="space-y-4">
        <input type="hidden" name="type" value={type} />
        <div className="space-y-2">
            <Label htmlFor="title">Item Title</Label>
            <Input id="title" name="title" placeholder="e.g., 'Black Leather Wallet'" />
            {state?.errors?.title && <p className="text-sm font-medium text-destructive">{state.errors.title[0]}</p>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Provide details like color, brand, and where it was lost/found." />
            {state?.errors?.description && <p className="text-sm font-medium text-destructive">{state.errors.description[0]}</p>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="contact">Contact Information</Label>
            <Input id="contact" name="contact" placeholder="e.g., 'john.doe@email.com' or 'return to library front desk'" />
            {state?.errors?.contact && <p className="text-sm font-medium text-destructive">{state.errors.contact[0]}</p>}
        </div>
         <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input id="image" name="image" type="file" accept="image/png, image/jpeg, image/gif" />
            {state?.errors?.image && <p className="text-sm font-medium text-destructive">{state.errors.image[0]}</p>}
        </div>
        
        <SubmitButton />
      </form>
  );
}
