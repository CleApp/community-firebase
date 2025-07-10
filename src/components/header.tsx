import { Users } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 md:px-6 md:py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Users className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-headline text-primary">
              CommunityConnect
            </h1>
            <p className="text-sm text-muted-foreground">
              Connecting communities, one post at a time.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
