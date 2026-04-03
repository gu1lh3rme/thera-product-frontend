import { render } from '@testing-library/react'
import { ProductCard } from '@/components/ProductCard'
import { Product } from '@/types/product'

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  category: 'Electronics',
  price: 99.99,
  description: 'A test product description',
  image: 'https://picsum.photos/seed/test/300/200',
}

describe('ProductCard', () => {
  it('renders correctly and matches snapshot', () => {
    const { container } = render(<ProductCard product={mockProduct} />)
    expect(container).toMatchSnapshot()
  })

  it('displays product title', () => {
    const { getByText } = render(<ProductCard product={mockProduct} />)
    expect(getByText('Test Product')).toBeInTheDocument()
  })

  it('displays product price', () => {
    const { getByText } = render(<ProductCard product={mockProduct} />)
    expect(getByText('$99.99')).toBeInTheDocument()
  })

  it('displays product category', () => {
    const { getByText } = render(<ProductCard product={mockProduct} />)
    expect(getByText('Electronics')).toBeInTheDocument()
  })
})
