export default async function fetcher(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
}

export async function getDishes() {
    const result = await fetcher("https://addis-eats-backend.onrender.com/menu/");
    return result?.data ?? [];
}

export async function getDishById(id) {
    const dishes = await getDishes();
    return dishes.find((dish) => String(dish.id) === String(id)) ?? null;
}
