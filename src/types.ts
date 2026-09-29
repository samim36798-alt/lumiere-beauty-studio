export interface ServiceItem {
  id: string;
  name: string;
  category: 'hair' | 'spa' | 'makeup' | 'nails' | 'grooming' | 'bridal';
  description: string;
  duration: string;
  price: number;
  image: string;
  popular?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: string;
  bio: string;
  image: string;
  instagram: string;
  awards: string[];
}

export interface PackagePlan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  duration: string;
  features: string[];
  recommended?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'interior' | 'hair' | 'makeup' | 'bridal' | 'nails';
  image: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

export interface ReviewItem {
  id: string;
  clientName: string;
  role: string;
  image: string;
  rating: number;
  service: string;
  date: string;
  comment: string;
}

export interface BookingData {
  fullName: string;
  phone: string;
  email: string;
  serviceId: string;
  artistId: string;
  date: string;
  time: string;
  notes: string;
}
