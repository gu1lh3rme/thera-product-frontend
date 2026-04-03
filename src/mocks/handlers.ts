import { http, HttpResponse } from 'msw'
import { Product } from '@/types/product'

const MOCK_PRODUCTS: Product[] = [
  { id: 1, title: 'Wireless Headphones', category: 'Electronics', price: 79.99, description: 'High-quality wireless headphones with noise cancellation', image: 'https://picsum.photos/seed/headphones/300/200' },
  { id: 2, title: 'Running Shoes', category: 'Sports', price: 89.99, description: 'Lightweight running shoes for all terrains', image: 'https://picsum.photos/seed/shoes/300/200' },
  { id: 3, title: 'JavaScript: The Good Parts', category: 'Books', price: 24.99, description: 'Essential JavaScript programming guide', image: 'https://picsum.photos/seed/jsbook/300/200' },
  { id: 4, title: 'Smart Watch', category: 'Electronics', price: 299.99, description: 'Feature-rich smartwatch with health tracking', image: 'https://picsum.photos/seed/smartwatch/300/200' },
  { id: 5, title: 'Cotton T-Shirt', category: 'Clothing', price: 19.99, description: 'Comfortable everyday cotton t-shirt', image: 'https://picsum.photos/seed/tshirt/300/200' },
  { id: 6, title: 'Garden Hose', category: 'Home & Garden', price: 34.99, description: '50ft expandable garden hose', image: 'https://picsum.photos/seed/hose/300/200' },
  { id: 7, title: 'Yoga Mat', category: 'Sports', price: 45.99, description: 'Non-slip yoga mat with carrying strap', image: 'https://picsum.photos/seed/yogamat/300/200' },
  { id: 8, title: 'Laptop Stand', category: 'Electronics', price: 49.99, description: 'Adjustable aluminum laptop stand', image: 'https://picsum.photos/seed/laptopstand/300/200' },
  { id: 9, title: 'Denim Jeans', category: 'Clothing', price: 59.99, description: 'Classic straight-fit denim jeans', image: 'https://picsum.photos/seed/jeans/300/200' },
  { id: 10, title: 'Clean Code', category: 'Books', price: 34.99, description: 'A handbook of agile software craftsmanship', image: 'https://picsum.photos/seed/cleancode/300/200' },
  { id: 11, title: 'Indoor Plant Pot', category: 'Home & Garden', price: 14.99, description: 'Ceramic plant pot with drainage hole', image: 'https://picsum.photos/seed/plantpot/300/200' },
  { id: 12, title: '4K Monitor', category: 'Electronics', price: 499.99, description: '27-inch 4K UHD monitor with HDR', image: 'https://picsum.photos/seed/monitor/300/200' },
  { id: 13, title: 'Tennis Racket', category: 'Sports', price: 89.99, description: 'Professional tennis racket for intermediate players', image: 'https://picsum.photos/seed/tennis/300/200' },
  { id: 14, title: 'Winter Jacket', category: 'Clothing', price: 149.99, description: 'Warm waterproof winter jacket', image: 'https://picsum.photos/seed/jacket/300/200' },
  { id: 15, title: 'Herb Garden Kit', category: 'Home & Garden', price: 29.99, description: 'Complete kit for growing herbs indoors', image: 'https://picsum.photos/seed/herbkit/300/200' },
]

let products = [...MOCK_PRODUCTS]

export const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json(products)
  }),
  http.post('/api/products', async ({ request }) => {
    const body = await request.json() as Omit<Product, 'id'>
    const newProduct = { ...body, id: Date.now() }
    products = [...products, newProduct]
    return HttpResponse.json(newProduct, { status: 201 })
  }),
]
