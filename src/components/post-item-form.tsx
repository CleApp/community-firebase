'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostItemSchema } from '@/lib/schemas';
import type { z } from 'zod';
import type { LostAndFoundItem } from '@/lib/types';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type PostItemFormProps = {
  type: 'lost' | 'found';
  setOpen: (open: boolean) => void;
  onPostItem: (item: Omit<LostAndFoundItem, 'id' | 'date' | 'type' | 'imageUrl' | 'imageHint'>, type: 'lost' | 'found') => void;
};

export function PostItemForm({ type, setOpen, onPostItem }: PostItemFormProps) {
  const form = useForm<z.infer<typeof PostItemSchema>>({
    resolver: zodResolver(PostItemSchema),
    defaultValues: {
      title: '',
      description: '',
      contact: '',
    },
  });

  function onSubmit(values: z.infer<typeof PostItemSchema>) {
    onPostItem(values, type);
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 'Black Leather Wallet'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Provide details like color, brand, and where it was lost/found." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Information</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 'john.doe@email.com' or 'return to library front desk'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-xs text-muted-foreground">
            Image uploads are not available in this demo. A placeholder image will be used.
        </p>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
