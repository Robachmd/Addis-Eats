'use client'
import { Trash2, X, Plus, Minus,RotateCcw,XCircle   } from "lucide-react";
import {useCartStore} from './cartStore';
import { useRouter } from "next/navigation";
function CartClient(){
    const router=useRouter();
    const items= useCartStore((state)=>state.items);
    const total= useCartStore((state)=>state.total);
    const itemCount= useCartStore((state)=>state.itemCount);
    const itemCounts=useCartStore((state)=>state.itemCounts);
    const removeFromCart= useCartStore((state)=>state.removeFromCart);
    const clearCart= useCartStore((state)=>state.clearCart);
    const increaseQuantity= useCartStore((state)=>state.increaseQuantity);
    const decreaseQuantity= useCartStore((state)=>state.decreaseQuantity);
    console.log(items);
    function gotoCheckout(){
        router.push('/checkout')
    }
    return(
        <div>
            <h1 className="mx-20 mt-10 font-bold font-serif text-3xl text-mahogany-red">Your Total Gursha Basket <span>{itemCount}</span></h1>

            {items.length===0?(
                <p>Your basket is empty,please add some dishes</p>
            ):(
                <div className="flex flex-col lg:flex-row gap-6 bg-pale-warm-white ">
                   
                <div className="flex-1">
                    <div className="flex pl-16">
                    <h1 className="font-bold font-serif">Clay Pot Stews & Provisions</h1>
                    <p className="font-light">({itemCounts} handicrafted selected)</p>
                    <button className="flex items-center justify-end text-chocolate-ambe hover:text-mahogany-red font-normal w-full mb-3 gap-1 cursor-pointer" onClick={clearCart}><RotateCcw size={14}/> Clear Cart </button>


                    </div>
                        {items.map((item)=>(
                            
                            <div className="flex items-center relative px-5 mx-3 ml-9 my-2  gap-4 h-40 rounded-md bg-pure-white" key={item.id}>
                                <img className="w-24 h-24 object-cover rounded-md" src={`/images/${item.slug}.png`} alt={item.nameEn} />
                                <div className="flex-1 ">
                                    <span className="absolute top-5 right-6 flex items-center gap-1 rounded-full border border-rust-red/30 px-2 py-0.5 text-xs font-medium text-mahogany-red">{item.spiceLevel}</span>
                                    <h1 className="text-mahogany-red text-xl font-bold">{item.nameEn}</h1>
                                    <p>{item.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex justify-end">
                                        <strong className="text-mahogany-red"> {item.priceETB}ETB</strong>
                                    </div>

                                    <button className="flex items-center justify-center text-pure-white h-8 w-8  rounded-lg bg-rust-red hover:bg-mahogany-red cursor-pointer" onClick={()=>decreaseQuantity(item.id)}> <Minus size={18} /></button>
                                    <span className="text-mahogany-red font-semibold w-6 ">{item.quantity}</span>
                                    <button className="flex items-center justify-center text-pure-white h-8 w-8  rounded-lg bg-rust-red hover:bg-mahogany-red cursor-pointer" onClick={()=>increaseQuantity(item.id)}> <Plus size={18} /></button>
                                    <button className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-red-50 hover:text-red-60"  onClick={()=>removeFromCart(item.id)}> <Trash2  size={28} /></button>
                                </div>

                            </div>
                        )
                    )}
                    </div>
                    <div className="w-full lg:w-75 shrink-0 bg-pure-white p-6">
                        <div className="flex flex-col mb-6 bg-soft-coral-tint">
                            <span className="font-extralight">Grand Total</span>
                            <strong className="text-mahogany-red text-2xl p-3 font-serif">ETB{total}</strong>
                        </div>
                        <button className="bg-rust-red cursor-pointer p-3 text-white text-center rounded-lg" onClick={gotoCheckout}>procedd to Delivery Checkout</button>
                    </div>
                    
                </div>
            )}
        </div>
        
    )
}

export default CartClient;