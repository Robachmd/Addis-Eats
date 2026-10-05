import React from 'react'
// import Link from 'next/link'
// import FilterDish from '../../(components)/(CategoryFilter)/FilterDish';
import MenuWrapper from '@/app/(components)/(menu-wrapper)/MenuWrapper';
export default  async function Menu() {
    const response= await fetch('https://addis-eats-backend.onrender.com/menu/', {
        next: { revalidate: 3600 }
    });
    if (!response.ok){
        throw new Error('Failed to fetch menu')
    }
    const result= await response.json()
    const dishes= result?.data|| [];
    console.log(result)
    if (dishes.length===0){
        return <p>No dishes available.</p>
    }
  return (
    <MenuWrapper dishes={dishes} />
  )
}
