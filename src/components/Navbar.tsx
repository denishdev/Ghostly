import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <>
      <div className="max-w-2xl mx-auto py-2 px-5 ">
        <div
          className={cn(
            'bg-[#55d082] text-white border-black hover:bg-white hover:text-[#55d082]',
            'flex items-center justify-center',
            'h-[55px] max-w-full px-1 border-2',
            'font-extrabold size',
            'rounded-full cursor-pointer',
            'transition-all duration-300'
          )}
        >
          <Link
            href='/'
            className={cn(
              'bg-[#55d082] text-white md:border-black ',
              'font-bold text-lg',
              'px-4 py-1.5',
              'rounded-full',
              'md:active:border-[0.5px] md:active:border-black active:transition-all active:duration-[10]',
              'transition-all duration-300'
            )}>Ghostly</Link>
        </div>
      </div>
    </>
  )
}

export default Navbar