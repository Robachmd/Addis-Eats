import React from 'react'
// import Link from 'next/link'
// import FilterDish from '../../(components)/(CategoryFilter)/FilterDish';
import { Suspense } from "react";
import {MenuWrapper} from '../../(components)/(menu-wrapper)/MenuWrapper';

export const metadata = {
    title: "Menu",
    description:
      "Explore Ethiopian Doro Wat, Tibs, Kitfo, Shiro, and fasting dishes at Addis Eats.",
    alternates: {
      canonical: "/menu",
    },
  };
  
export default  async function Menu() {
    const response= await fetch('https://addis-eats-backend.onrender.com/menu/', {
        next: { revalidate: 3600 }
    });
    if (!response.ok){
        throw new Error('Failed to fetch menu')
    }
    const result= await response.json()
    const dishes= result?.data|| [];
    // console.log(result)
    if (dishes.length===0){
        return <p>No dishes available.</p>
    }
  return (
    <Suspense fallback={<p>Loading menu...</p>}>
        <MenuWrapper dishes={dishes} />
    </Suspense>  )
}
