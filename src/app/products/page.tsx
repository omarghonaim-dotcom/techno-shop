import Loadingscreen from '@/components/Loadingscreen'
import Featuredproducts from '@/components/products/Featuredproducts'
import React, { Suspense } from 'react'

export default function page() {
  
  return (
    <Suspense fallback={<Loadingscreen/>}>
      <Featuredproducts></Featuredproducts>
    </Suspense>
  )
}
