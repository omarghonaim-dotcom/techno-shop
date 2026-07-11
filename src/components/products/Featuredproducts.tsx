import { ProductInterface } from '@/interfaces/products.interface'
import Productcard from './Productcard'
import { handleProducts } from '@/app/api/products/products.api';

export default async function Featuredproducts() {
    const data: ProductInterface[] = await handleProducts();
  return (

    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* 
           Grid Layout:
           - Mobile: 1 column (grid-cols-1)
           - Tablet: 2 columns (md:grid-cols-2)
           - Desktop: 4 columns (lg:grid-cols-4)
        */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          dir="rtl" // Important for Persian Text
        >
          {data?.map((product) => (
            <Productcard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  )
}
