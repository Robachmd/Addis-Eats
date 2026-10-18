
import { notFound } from "next/navigation";
import { getDish } from "../../../../lib/db";
import DishDetailsClient from "../../../../(components)/(DishDetailsClient)/DishDetailsClient";

const MENU_URL = "https://addis-eats-backend.onrender.com/menu/";

export async function generateStaticParams() {
    const response = await fetch(MENU_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch menu dishes");
    }

    const result = await response.json();
    const dishes = result?.data || [];

    return dishes.map((dish) => ({
        id: String(dish.id),
    }));
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const dish = await getDish(id);

    if (!dish) {
        return { title: "Dish not found" };
    }

    return {
        title: dish.nameEn,
        description: `${dish.nameEn} — ${dish.priceETB} ETB. ${dish.description}`,
    };
}

export default async function SingleDishDetails({ params }) {
    const { id } = await params;

    const response = await fetch(MENU_URL, {
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch menu dishes");
    }

    const result = await response.json();

    const dish = (result?.data || []).find(
        (item) => String(item.id) === String(id)
    );

    if (!dish) {
        notFound();
    }

    return <DishDetailsClient dish={dish} />;
}
