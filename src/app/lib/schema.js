import { z } from "zod";
export const orderSchema = z.object({
    name: z.string({ required_error: "Name is required", }).min(2, "Name must be at least 2 characters"),
    phone: z.string({ required_error: "Phone number is required", }).regex(/^(09|\+2519)\d{8}$/, "Phone number must start with 09… or +2519… followed by 8 digits"),
    email: z.string().email("Enter a valid email"),
    dishId: z.string().optional(),
    quantity: z.number().min(1, "Quantity must be at least 1").optional().default(1),
    notes: z.string().max(200, "Notes cannot exceed 200 characters").optional(),
    subcity: z.string().min(2,"Enter your subcity "),
    address:z.string().min(3,"Enter Your address"),
    paymentMethod: z.string().min(1,"add payment method"),
});
export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().regex(/^(09|\+2519)\d{8}$/, "Enter a valid Ethiopian phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const loginSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password is required"),
});