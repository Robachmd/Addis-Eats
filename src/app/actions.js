"use server";

import { createOrder, getOrder, markCancelled } from "./lib/db";
import { orderSchema, registerSchema, loginSchema } from "./lib/schema";
import { getSession, setSession, clearSession } from "./lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getSafeNext(formData) {
  const nextUrl = formData.get("next");

  if (typeof nextUrl === "string" && nextUrl.startsWith("/") && !nextUrl.startsWith("//") && !nextUrl.includes("\\")) {
    return nextUrl;
  }
  return "/menu";
}

export async function loginUser(previousState, formData) {
  const checkInput = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!checkInput.success) {
    return {
      fieldErrors: checkInput.error.flatten().fieldErrors,
    };
  }

  await setSession();

  const nextUrl = getSafeNext(formData);

  redirect(nextUrl);
}

export async function registerUser(previousState, formData) {
  const checkInput = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!checkInput.success) {
    return {
      fieldErrors: checkInput.error.flatten().fieldErrors,
    };
  }

  await setSession();

  const nextUrl = getSafeNext(formData);

  redirect(nextUrl);
}

export async function logoutUser() {
  await clearSession();
  redirect("/login");
}

export async function placeOrder(previousState, formData) {
  const user = await getSession();

  if (!user) {
    redirect("/login?next=%2Fcheckout");
  }

  const checkInput = orderSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    dishId: formData.get("dishId"),
    quantity: Number(formData.get("quantity") || 1),
    subcity: formData.get("subcity"),
    address: formData.get("address"),
    notes: formData.get("notes"),
    paymentMethod: formData.get("paymentMethod"),
  });

  if (!checkInput.success) {
    return {
      fieldErrors: checkInput.error.flatten().fieldErrors,
    };
  }

  const order = await createOrder(checkInput.data);

  revalidatePath("/orders");

  return {
    id: order.id,
  };
}

export async function cancelOrder(orderId) {
  const user = await getSession();

  if (!user) {
    throw new Error("Not signed in");
  }

  const order = await getOrder(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.userId !== user.id) {
    throw new Error("You cannot cancel another user's order");
  }

  await markCancelled(orderId);

  revalidatePath("/orders");
}
