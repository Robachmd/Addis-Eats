'use client'
import dynamic from "next/dynamic"
const Map = dynamic(() => import('./Map'), {ssr: false,
    loading: () => <p>Loading map...</p>,
    });const OrderStatus = ()=>{
    return (
        <>
        <h1 className="text-4xl p-5">Live order tracking</h1>
        <Map/>
        </>
    );
};
export default OrderStatus;