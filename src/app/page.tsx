'use client'

import { useState } from 'react'
import { MSWProvider } from '@/components/MSWProvider'
import { ProductList } from '@/components/ProductList'
import { ProductFilters } from '@/components/ProductFilters'
import { ProductForm } from '@/components/ProductForm'

export default function Home() {
  const [showForm, setShowForm] = useState(false)

  return (
    <MSWProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">Manage your product catalog</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductFilters />
          <ProductList />
        </main>

        {showForm && <ProductForm onClose={() => setShowForm(false)} />}
      </div>
    </MSWProvider>
  )
}
