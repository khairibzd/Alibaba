import { ArrowRight, ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

import PopularProducts from '@/components/PopularProducts'
import PopularProductsSkeleton from '@/components/skeletons/PopularProductsSkeleton'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const Products = async () => {
  return (
    <section
      id='products'
      aria-labelledby='product-heading'
      className='space-y-8 py-8 md:pt-10 lg:pt-24 m-5'
    >
      <div className='flex items-end justify-between'>
        <div className='flex flex-col space-y-4'>
        <h2 className="section-title">Browse all products</h2>

          <h3 className='text-sm md:text-base lg:text-lg xl:text-xl text-gray-500'>
            Explore all products of alibaba
          </h3>
        </div>
        <Link
          href='/products'
          className='font-medium tracking-widest hidden md:flex gap-1 hover:translate-x-1  transition-all'
        >
          Shop the collection <ArrowRight />
        </Link>
      </div>
      <Suspense fallback={<PopularProductsSkeleton />}>
        <PopularProducts />
      </Suspense>
      <Link
        href='/products'
        className={cn(
          buttonVariants(),
          'mx-auto bg-[#0369a1] flex w-fit hover:before:-translate-x-48',
        )}
      >
        View all products
        <ArrowRightIcon className='ml-2 h-4 w-4' aria-hidden='true' />
      </Link>
    </section>
  )
}

export default Products
