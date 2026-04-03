import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Product, ProductsState } from '@/types/product'

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  filter: {
    name: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'name',
    sortOrder: 'asc',
  },
  currentPage: 1,
  itemsPerPage: 6,
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('/api/products')
  if (!response.ok) throw new Error('Failed to fetch products')
  return response.json() as Promise<Product[]>
})

export const addProduct = createAsyncThunk('products/addProduct', async (product: Omit<Product, 'id'>) => {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
  if (!response.ok) throw new Error('Failed to add product')
  return response.json() as Promise<Product>
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Partial<ProductsState['filter']>>) {
      state.filter = { ...state.filter, ...action.payload }
      state.currentPage = 1
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.status = 'loading' })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown error'
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
  },
})

export const { setFilter, setCurrentPage } = productsSlice.actions
export default productsSlice.reducer

import type { RootState } from './index'

export const selectAllProducts = (state: RootState) => state.products.items
export const selectProductsStatus = (state: RootState) => state.products.status
export const selectProductsError = (state: RootState) => state.products.error
export const selectFilter = (state: RootState) => state.products.filter
export const selectCurrentPage = (state: RootState) => state.products.currentPage
export const selectItemsPerPage = (state: RootState) => state.products.itemsPerPage

export const selectFilteredProducts = (state: RootState) => {
  const { items, filter } = state.products
  let filtered = [...items]

  if (filter.name) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(filter.name.toLowerCase()))
  }
  if (filter.minPrice) {
    filtered = filtered.filter(p => p.price >= parseFloat(filter.minPrice))
  }
  if (filter.maxPrice) {
    filtered = filtered.filter(p => p.price <= parseFloat(filter.maxPrice))
  }

  filtered.sort((a, b) => {
    let aVal: string | number, bVal: string | number
    if (filter.sortBy === 'price') {
      aVal = a.price; bVal = b.price
    } else if (filter.sortBy === 'category') {
      aVal = a.category.toLowerCase(); bVal = b.category.toLowerCase()
    } else {
      aVal = a.title.toLowerCase(); bVal = b.title.toLowerCase()
    }
    if (aVal < bVal) return filter.sortOrder === 'asc' ? -1 : 1
    if (aVal > bVal) return filter.sortOrder === 'asc' ? 1 : -1
    return 0
  })

  return filtered
}

export const selectPaginatedProducts = (state: RootState) => {
  const filtered = selectFilteredProducts(state)
  const { currentPage, itemsPerPage } = state.products
  const start = (currentPage - 1) * itemsPerPage
  return filtered.slice(start, start + itemsPerPage)
}

export const selectTotalPages = (state: RootState) => {
  const filtered = selectFilteredProducts(state)
  return Math.ceil(filtered.length / state.products.itemsPerPage)
}
