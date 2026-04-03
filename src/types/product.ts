export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filter: {
    name: string;
    minPrice: string;
    maxPrice: string;
    sortBy: 'name' | 'price' | 'category';
    sortOrder: 'asc' | 'desc';
  };
  currentPage: number;
  itemsPerPage: number;
}
