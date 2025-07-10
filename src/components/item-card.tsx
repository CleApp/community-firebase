import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { LostAndFoundItem } from '@/lib/types';
import { MessageSquare, Calendar } from 'lucide-react';

export function ItemCard({ item }: { item: LostAndFoundItem }) {
  return (
    <Card className="flex flex-col overflow-hidden h-full transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full">
            <Image 
              src={item.imageUrl} 
              alt={item.title} 
              layout="fill" 
              objectFit="cover" 
              data-ai-hint={item.imageHint}
              className="bg-muted"
            />
        </div>
      </CardHeader>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
            <Badge variant={item.type === 'lost' ? 'destructive' : 'secondary'} className="mb-2">
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Badge>
            <CardTitle className="font-headline text-lg mb-2">{item.title}</CardTitle>
            <CardDescription className="text-sm line-clamp-3">
                {item.description}
            </CardDescription>
        </div>
        <CardFooter className="flex justify-between text-sm text-muted-foreground p-0 pt-4 mt-4 border-t">
          <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{item.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              <span className="truncate">{item.contact}</span>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
