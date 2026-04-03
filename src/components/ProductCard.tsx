'use client'

import { Product } from '@/types/product'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800 flex-1 mr-2 line-clamp-1">{product.title}</h3>
          <span className="text-lg font-bold text-blue-600 whitespace-nowrap">${product.price.toFixed(2)}</span>
        </div>
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mb-2">
          {product.category}
        </span>
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
      </div>
    </div>
  )
}
