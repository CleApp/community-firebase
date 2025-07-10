export type LostAndFoundItem = {
  id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  imageUrl: string;
  contact: string;
  date: string;
  imageHint: string;
};

export type CommunityReport = {
  id: string;
  type: string;
  location: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  reason: string;
};

export type Resource = {
  name: string;
  description: string;
  link: string;
};
