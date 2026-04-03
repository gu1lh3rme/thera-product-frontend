'use client'

import { useAppDispatch, useAppSelector } from '@/store'
import { setFilter, selectFilter } from '@/store/productsSlice'

export function ProductFilters() {
  const dispatch = useAppDispatch()
  const filter = useAppSelector(selectFilter)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    dispatch(setFilter({ [name]: value }))
  }

  const handleReset = () => {
    dispatch(setFilter({ name: '', minPrice: '', maxPrice: '', sortBy: 'name', sortOrder: 'asc' }))
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <label className="block text-xs font-medium text-gray-500 mb-1">Search by name</label>
          <input
            type="text"
            name="name"
            value={filter.name}
            onChange={handleChange}
            placeholder="Search products..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Min price ($)</label>
          <input
            type="number"
            name="minPrice"
            value={filter.minPrice}
            onChange={handleChange}
            placeholder="0"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Max price ($)</label>
          <input
            type="number"
            name="maxPrice"
            value={filter.maxPrice}
            onChange={handleChange}
            placeholder="1000"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Sort by</label>
          <div className="flex gap-1">
            <select
              name="sortBy"
              value={filter.sortBy}
              onChange={handleChange}
              className="flex-1 px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="category">Category</option>
            </select>
            <button
              onClick={() => dispatch(setFilter({ sortOrder: filter.sortOrder === 'asc' ? 'desc' : 'asc' }))}
              className="px-2 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              title={filter.sortOrder === 'asc' ? 'Sort ascending' : 'Sort descending'}
            >
              {filter.sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <button
          onClick={handleReset}
          className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
        >
          Reset filters
        </button>
      </div>
    </div>
  )
}
