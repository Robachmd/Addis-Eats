'use client'
import { Heart, ShoppingCart } from "lucide-react";
import React from 'react'
import Link from 'next/link'
import { useCartStore } from '../(store)/cartStore';
function Header() {
  const total=useCartStore((state)=>state.total)
  const itemCounts= useCartStore((state)=>state.itemCounts);
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
                {itemCounts!==0 && <div className='flex flex-2 items-center gap-3 bg-dark-forest-green text-pure-white p-1 rounded-md'>
                                <div>
                                  <li><ShoppingCart size={20}/></li>
                                </div>
                                <div>
                                    <li ><strong>{total} </strong>ETB </li>
                                    <li><strong>{itemCounts}</strong> items </li>
                                </div>
                            </div>            
                
                }

            </ul>
        </nav>
    </header>
  )
}

export default Header;