import { create } from "zustand";
function calculateCart(items){
    let itemCount=0;
    let total=0;
    let itemCounts=items.length;

    items.forEach(item => {
        itemCount+=item.quantity
        total+=item.quantity*item.priceETB
    });
    return {itemCount,total,itemCounts}

}
    export const useCartStore=create((set)=>({
        items:[],
        total:0,
        itemCount:0,
        itemCounts:0,
        addToCart:(dish,quantity=1)=>
            set((state)=>{
                const existingItem=state.items.find((item)=>item.id===dish.id);
                if (existingItem){
                    return state;
                }
            const newItems=[...state.items,{...dish,quantity}]
            return {items:newItems,...calculateCart(newItems)}
        }),
        removeFromCart:(id)=>
            set((state)=>{
                const newItems=state.items.filter((item)=>item.id!==id);
                return {items:newItems,...calculateCart(newItems)}
            }),
        clearCart:()=>
            set({
                items:[],
                total:0,
                itemCount:0,
                itemCounts:0
            }),
        increaseQuantity:(id)=>
            set((state)=>{
                const newItems=state.items.map((item)=>
                    item.id===id? {...item,quantity:item.quantity+1}:item
                )
                return{items:newItems, ...calculateCart(newItems)}
            }),
        decreaseQuantity:(id)=>
            set((state)=>{
                const newItems=state.items.map((item)=>
                item.id ===id? {...item,quantity:Math.max(1,item.quantity-1)}:item
            )
            return {items:newItems,...calculateCart(newItems)}

            })

    }))