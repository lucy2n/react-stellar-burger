export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

// Modal Types

export const ORDER_MODAL = "ORDER_MODAL";
export const INGREDIENT_MODAL = "INGRDIENT_MODAL";

export const openIngredientModal = (ingredient) => ({
    type: OPEN_MODAL,
    modalType: INGREDIENT_MODAL,
    modalProps: ingredient
});

export const openOrderModal = (order) => ({
    type: OPEN_MODAL,
    modalType: ORDER_MODAL,
    modalProps: order
});

export const closeModal = () => ({
    type: CLOSE_MODAL
});