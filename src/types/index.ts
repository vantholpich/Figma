export interface Person {
  id: string;
  name: string;
  age: number;
  bio: string;
  occupation: string;
  image: string;
  gallery: string[];
  bids: number;
  auctionedBy: string;
  about: string;
  pros: string[];
  cons: string[];
  interests: string[];
  testimonials: {
    name: string;
    text: string;
    avatar: string;
  }[];
}

export interface Bid {
  id: string;
  personId: string;
  amount: number;
  message: string;
  timestamp: Date;
}

export type ViewType = 'auctions' | 'my-bids' | 'profile';