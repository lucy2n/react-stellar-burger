import { api } from "./constants";

export const getIngredients = async () => {
    const res = await fetch(`${api}/ingredients`);
    if (!res.ok) {
      throw new Error("Некорректный результат");
    }
    return await res.json();
}

export const getOrderData = async (ingredientsId) => {
    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "ingredients": ingredientsId })
    };

    const res = await fetch(`${api}/orders`, settings)
    if (!res.ok) {
        throw new Error("Некорректный результат");
    }
    return await res.json();
}