import React from 'react'
import {notFound} from 'next/navigation'
export async function generateStaticParams() {

    const response = await fetch('https://addis-eats-backend.onrender.com/menu/')
    if (!response.ok){
        throw new Error('Failed to fetch menu dishes')
    }
    const result = await response.json()
    const dishes = result?.data||[];

  return dishes.map((dish)=>({
    id:dish.id
  }))
}
const SingleDishDetails= async ({params})=>{
    const {id}= await params;
    const response= await fetch('https://addis-eats-backend.onrender.com/menu/',{
        next:{revalidate:3600}
    })
    if (!response.ok){
        throw new Error('Failed to fetch menu dishes')
    }
    const result = await response.json()
    const dishes= result.data.find((dish)=>dish.id===id)
    if (!dishes){
        notFound()
    }
    return(
        // <DishDetailsClient dish={dishes}
        <div className='flex flex-col gap-3 m-8'>
            <img src={`/images/${dishes.slug}.png`} alt={dishes.nameEn} className='w-full h-50 object-contain' />
            <h2>Spice Level:  <span className='bg-red-500 text-white p-2 w-40 h-10 rounded-md'>{dishes.spiceLevel}</span></h2>
            <h2>{dishes.nameEn}({dishes.nameAm})</h2>
            <p>{dishes.category}</p>
            <p>{dishes.description}</p>
            <p>{dishes.ingredients?.join(', ')}</p>
            <p>{dishes.servings}</p>
            <p>{dishes.isSpecial && <span className='bg-green-500 text-white p-2 w-40 h-10 rounded-md'>Special</span>}</p>
            <p>{dishes.isFasting && <span className='bg-blue-500 text-white p-2 w-40 h-10 rounded-md'>Fasting</span>}</p>
            <div className='flex flex-row justify-between items-center gap-3'>
            <p>{dishes.priceETB}</p>
            <button className='bg-red-700 hover:bg-red-600 cursor-pointer text-white p-2 w-15 rounded-md' > Add+</button>
            </div>
        </div>
    )
}
export default SingleDishDetails;