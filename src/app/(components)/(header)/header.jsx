import React from 'react'
import Link from 'next/link'
function Header() {
  return (
    <header className='sticky z-50 w-full top-0 border-b border-gray-200 bg-pale-warm-white'>
        <nav className=' mx-auto flex h-16 px-6  max-w-7xl justify-between items-center  text-dark-espresso font-semibold' >
        <Link className='text-2xl text-mahogany-red font-bold' href="/">Addis-eats</Link>
            <ul className='flex gap-8 items-center' >
                <li><Link href="/">Home</Link></li>
                <li><Link href="/menu">Menu</Link></li>
                <li><Link href="/cart">Order & Cart</Link></li>
                <li><Link href="/checkout">Checkout</Link></li>
                <li><Link href="/register">register</Link></li>
                <li><Link href="/login">login</Link></li>

            </ul>
        </nav>
    </header>
  )
}

export default Header;