'use client';

import { useState, useMemo } from 'react';
import { ItemCard } from './item-card';
import { PostItemForm } from './post-item-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import type { LostAndFoundItem } from '@/lib/types';
import { PlusCircle, Search } from 'lucide-react';

const initialItems: LostAndFoundItem[] = [
  { id: '1', type: 'lost', title: 'Golden Retriever "Buddy"', description: 'Lost near Central Park. He is very friendly and has a blue collar. Reward offered.', imageUrl: 'https://placehold.co/600x400.png', contact: 'jane.doe@email.com', date: '2024-07-20', imageHint: 'dog retriever'},
  { id: '2', type: 'found', title: 'Set of Keys', description: 'Found a set of keys with a red keychain on the bench at the bus stop on 5th Ave.', imageUrl: 'https://placehold.co/600x400.png', contact: 'Local Precinct', date: '2024-07-19', imageHint: 'keys keychain'},
  { id: '3', type: 'lost', title: 'Black Leather Wallet', description: 'Lost my wallet, likely in the downtown area. Contains ID and credit cards. It is very important.', imageUrl: 'https://placehold.co/600x400.png', contact: 'john.smith@email.com', date: '2024-07-18', imageHint: 'leather wallet'},
  { id: '4', type: 'found', title: 'iPhone 14 Pro', description: 'Found an iPhone in a black case at the public library. The lock screen shows a picture of a cat.', imageUrl: 'https://placehold.co/600x400.png', contact: 'Library Front Desk', date: '2024-07-21', imageHint: 'iphone case'},
];

export function LostAndFound() {
  const [items, setItems] = useState<LostAndFoundItem[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLostFormOpen, setLostFormOpen] = useState(false);
  const [isFoundFormOpen, setFoundFormOpen] = useState(false);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    return items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  const lostItems = filteredItems.filter(item => item.type === 'lost');
  const foundItems = filteredItems.filter(item => item.type === 'found');

  const handlePostItem = (newItem: LostAndFoundItem) => {
    setItems(prevItems => [newItem, ...prevItems]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full max-w-md">
          <Input
            placeholder="Search by keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="w-5 h-5" />
          </span>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <Dialog open={isLostFormOpen} onOpenChange={setLostFormOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <PlusCircle className="mr-2 h-4 w-4" /> Post Lost Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-headline">Post a Lost Item</DialogTitle>
                <DialogDescription>Provide details and an image of the item you've lost.</DialogDescription>
              </DialogHeader>
              <PostItemForm type="lost" setOpen={setLostFormOpen} onPostItem={handlePostItem} />
            </DialogContent>
          </Dialog>
          <Dialog open={isFoundFormOpen} onOpenChange={setFoundFormOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Post Found Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-headline">Post a Found Item</DialogTitle>
                 <DialogDescription>Provide details of the item you've found. You can add a photo if you wish.</DialogDescription>
              </DialogHeader>
              <PostItemForm type="found" setOpen={setFoundFormOpen} onPostItem={handlePostItem} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs defaultValue="all-items">
        <TabsList>
          <TabsTrigger value="all-items">All Items</TabsTrigger>
          <TabsTrigger value="lost-items">Lost Items</TabsTrigger>
          <TabsTrigger value="found-items">Found Items</TabsTrigger>
        </TabsList>
        <TabsContent value="all-items" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
          {filteredItems.map(item => <ItemCard key={item.id} item={item} />)}
        </TabsContent>
        <TabsContent value="lost-items" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
          {lostItems.map(item => <ItemCard key={item.id} item={item} />)}
        </TabsContent>
        <TabsContent value="found-items" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
          {foundItems.map(item => <ItemCard key={item.id} item={item} />)}
        </TabsContent>
      </Tabs>
      {filteredItems.length === 0 && <p className="text-center text-muted-foreground py-10">No items match your search.</p>}
    </div>
  );
}
