'use client'

import { useAppDispatch, useAppSelector } from '@/store'
import { setCurrentPage, selectCurrentPage, selectTotalPages } from '@/store/productsSlice'

export function Pagination() {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(selectCurrentPage)
  const totalPages = useAppSelector(selectTotalPages)

  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => dispatch(setCurrentPage(page))}
          className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
            page === currentPage
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  )
}
