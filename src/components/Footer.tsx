import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (


    <footer className="rounded-lg max-w-screen px-[10vw] pb-5">
        <hr className=" border-black my-8" />
        <span className="flex justify-center text-sm text-[#55d082] sm:text-center font-bold">© 2025 
        <Link href="/" className="hover:underline">Ghostly™</Link>. All Rights Reserved.</span>
    </footer>


  )
}

export default Footer