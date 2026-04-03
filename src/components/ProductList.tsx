'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchProducts, selectProductsStatus, selectProductsError, selectPaginatedProducts, selectFilteredProducts, selectCurrentPage, selectItemsPerPage } from '@/store/productsSlice'
import { ProductCard } from './ProductCard'
import { Pagination } from './Pagination'

export function ProductList() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectProductsStatus)
  const error = useAppSelector(selectProductsError)
  const paginatedProducts = useAppSelector(selectPaginatedProducts)
  const filteredProducts = useAppSelector(selectFilteredProducts)
  const currentPage = useAppSelector(selectCurrentPage)
  const itemsPerPage = useAppSelector(selectItemsPerPage)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
              <div className="h-3 bg-gray-200 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <button
          onClick={() => dispatch(fetchProducts())}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  if (paginatedProducts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-xl mb-2">No products found</p>
        <p className="text-sm">Try adjusting your filters</p>
      </div>
    )
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, filteredProducts.length)

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        Showing {startItem}–{endItem} of {filteredProducts.length} products
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination />
    </div>
  )
}
