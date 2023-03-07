export interface Catergory {
  id: string
  name: string
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Catergory;
}


