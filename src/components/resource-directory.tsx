import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import type { Resource } from '@/lib/types';

const resources: Resource[] = [
  {
    name: 'Local Police Department',
    description: 'For emergencies and non-emergency crime reporting. Call 911 for immediate threats.',
    link: '#',
  },
  {
    name: 'City Council Services',
    description: 'Report issues like potholes, broken streetlights, and sanitation problems.',
    link: '#',
  },
  {
    name: 'Animal Control',
    description: 'Contact for issues with stray, lost, or dangerous animals in the community.',
    link: '#',
  },
  {
    name: 'Community Mediation Center',
    description: 'Provides free services to help resolve neighbor disputes and other conflicts.',
    link: '#',
  },
];

export function ResourceDirectory() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <div className="text-center">
            <h2 className="text-3xl font-bold font-headline text-primary">Helpful Resources</h2>
            <p className="text-muted-foreground mt-2">A directory of local services and authorities for your convenience.</p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <Card key={resource.name} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline">{resource.name}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Button asChild variant="outline" className="w-full">
                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                  Visit Website <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
