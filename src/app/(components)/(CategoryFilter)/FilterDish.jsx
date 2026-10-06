"use client"
import { Plus} from "lucide-react";

import React from 'react'
import Link from 'next/link';
import { useCartStore } from '../(store)/cartStore';
export default function FilterDish({dishes}) {
    const addToCart=useCartStore((state)=>state.addToCart)
  return (
    <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-4 py-6'>
        {dishes.map((item)=>(
            <div className='flex flex-col bg-pure-white rounded-md overflow-hidden shadow-sm hover:shadow-xl' key={item.id}>
                <Link className='block' key={item.id} href={`/menu/dish/${item.id}`}>
                    <img src={`/images/${item.slug}.png`} alt={item.nameEn}  width={400} height={120} className='w-full aspect-4/3 object-cover ' />
                    <h3 className='text-dark-espresso hover:text-mahogany-red px-2 mb-4 text-xl font-serif leading-tight line-clamp-1'>{item.nameEn}({item.nameAm})</h3>
                </Link>
                <div className='flex flex-col flex-1 px-4 pb-4'>
                    <p className='text-taupe-brown mb-16px text-sm font-serif line-height-1.5 font-normal line-clamp-3'>{item.description}</p>
                    <div className='flex justify-between items-center mt-auto pt-6'>
                        <p className='text-mahogany-red text-lg font-bold'>ETB{item.priceETB}</p>
                        <button className='bg-rust-red hover:bg-red-600 cursor-pointer text-white p-2 w-auto rounded-md flex items-center justify-self-end' onClick={()=>addToCart(item)}> add <Plus size={16} /></button>
                    </div>

                </div>
            </div>
        ))}
    </div>


    </div> 
  )
}

