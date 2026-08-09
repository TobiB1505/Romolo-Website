export interface MenuItem {
  name: string;
  description?: string;
  price: string;
  note?: string;
}

export interface MenuCategory {
  slug: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
}

export interface OpeningHoursEntry {
  day: string;
  hours: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface RoomTourStop {
  id: string;
  number: string;
  name: string;
  description: string;
  image: GalleryImage;
}

export interface RestaurantSettings {
  name: string;
  tagline: string;
  street: string;
  zip: string;
  city: string;
  phone: string;
  phoneHref: string;
  email: string;
  hours: OpeningHoursEntry[];
  lat: number;
  lng: number;
  instagramUrl?: string;
  facebookUrl?: string;
}
