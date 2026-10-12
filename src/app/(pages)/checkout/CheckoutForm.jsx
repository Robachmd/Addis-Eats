"use client"
import { useActionState } from "react";
import { useCartStore } from "../../(components)/(store)/cartStore";
import { placeOrder } from "../../actions";
function CheckoutForm(){
    const items=useCartStore((state)=>state.items);
    const total=useCartStore((state)=>state.total);
    const [state,formAction,pending]= useActionState(placeOrder,null);
    if(items.length===0){
        return(
            <div>
                <h2>Your cart is empty</h2>
            </div>
        )
    }
    return(
        <div >
            <div className="flex flex-col   bg-pale-warm-white ">
                <h2>Checkout delivery</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 ">
                <main className="min-w-0">
                    <form className="flex flex-col w-full gap-4 p-6 " action={formAction}>
                        <div className=" flex flex-col p-4 gap-2 w-full h-auto  bg-pure-white">
                            <h2>1. Contact and Guest Details</h2>
                            <div className="flex flex-row">
                                <label htmlFor="name">Recipient Name</label>
                                <input className=" rounded-lg border gap-4 border-gray-300 bg-soft-coral-tint  text-dark-espresso outline-none focus:border-mahogany-red" type="text" name="name" />
                                {state?.fieldErrors?.name &&(<p>{state.fieldErrors.name[0]}</p>)}
                                <label htmlFor="phone">Phone</label>
                                <input className="bg-soft-coral-tint outline-none" type="tel" name="phone" />
                                {state?.fieldErrors?.phone &&(<p>{state.fieldErrors.phone[0]}</p>)}
                            </div>
                            <label htmlFor="email">email</label>
                            <input className=" bg-soft-coral-tint outline-none w-full" type="email" name="email"/>
                            {state?.fieldErrors?.email &&(<p>{state.fieldErrors.email[0]}</p>)}

                        </div>
                        <div className=" flex flex-col p-4 gap-2 w-full h-auto  bg-pure-white">
                            <h2>Delivery Location in Addis Ababa</h2>
                            <label htmlFor="text">subcity</label>
                            <input className="bg-soft-coral-tint" type="text" name="subcity"/>
                            {state?.fieldErrors?.subcity &&(<p>{state.fieldErrors.subcity[0]}</p>)}
                            <label htmlFor="text">address</label>
                            <input className="bg-soft-coral-tint" type="text" name="address"/>
                            {state?.fieldErrors?.address &&(<p>{state.fieldErrors.address[0]}</p>)}


                        </div>
                        <label htmlFor="option">payment method</label>
                        <select name="paymentMethod" id="option">
                            <option name="paymentMethod" value="telebirr">telebirr</option>
                            <option name="paymentMethod" value="cbe">cbe</option>
                            <option name="paymentMethod" value="master">master card</option>
                        </select>
                        {state?.fieldErrors?.paymentMethod &&(<p>{state.fieldErrors.paymentMethod[0]}</p>)}

                        <input type="hidden" name="dishId" value={items[0]?.id||""} />
                        <input type="hidden" name="quantity" value={items[0]?.quantity||""} />
                        <label htmlFor="notes">Delivery Information</label>
                        <textarea name="notes" id="notes"></textarea>
                        {state?.fieldErrors?.notes &&(<p>{state.fieldErrors.notes[0]}</p>)}
                        <h3>Total: ETB {total}</h3>
                        {state?.id &&(<p>order placed successfully. order ID - {state.id}</p>)}
                        <button className="cursor-pointer" type="submit" disabled={pending}> {pending? "sending..":"confirm order"}</button>
                    </form>
                </main>
                    <aside className="flex flex-col gap-4 w-100 p-3 mr-2 ml-auto h-fit  bg-pure-white">
                    <h1>your total price of all ordered food</h1>
                    {items.map((item) => (
                        <div className="flex flex-col-1" key={item.id}>
                            <img className="w-14 h-14 object-cover rounded-md" src={`/images/${item.slug}.png`} alt={item.nameEn} />
                            <div>
                                <h2>{item.nameEn}</h2>
                                <h2 className="flex justify-end">{item.priceETB}</h2>
                            </div>
                            <p>{item.ingredient}</p>
                            <p>{item.spiceLevel} <span>Qty:{item.quantity}</span></p>
                        </div>
                    ))}                   
                    <strong>total<h1>{total}</h1></strong>
                    <button className="cursor-pointer" type="submit" disabled={pending}> {pending? "sending..":"confirm order"}</button>

                    {state?.id &&(<p>order placed successfully. order ID - {state.id}</p>)}
                    </aside>
            </div>
        </div>
        
    )
}
export default CheckoutForm;