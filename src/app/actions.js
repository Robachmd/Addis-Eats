"use server";
import {createOrder,getSession,getOrder,markCancelled,} from "./lib/db"
import { orderSchema } from "./lib/schema"
import { revalidatePath } from "next/cache"

export async function placeOrder(previousState,formData){
    const checkInput=orderSchema.safeParse({
            name:formData.get("name"),
            phone:formData.get("phone"),
            email:formData.get("email"),
            dishId:formData.get("dishId"),
            quantity:Number(formData.get("quantity")||1),
            subcity:formData.get("subcity"),
            address:formData.get("address"),
            notes:formData.get("notes"),
            paymentMethod:formData.get("paymentMethod"),

        });
        if (!checkInput.success){
            return {
                fieldErrors:checkInput.error.flatten().fieldErrors
            };
        }
        const order= await createOrder(checkInput.data);
            revalidatePath("/orders");
        return {
            id:order.id
        };
}
export async function cancelOrder(orderId){
    const user = await getSession();
    if (!user){
        throw new Error("not signed in")
    }
    const order = await getOrder(orderId);
    if (!order) {
        throw new Error("Order not found");
    }
    
    if (order.userId !==user.id){
        throw new Error("not your order you trying to cancel");
    }
    await markCancelled(orderId)
}