export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  year: string;
  category: string;
  medium?: string;
  dimensions?: string;
  featured?: boolean;
  additionalImages?: string[];
  price?: number;
  sold?: boolean;
}

export interface Exhibition {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  description: string;
  ongoing: boolean;
}