
import actionType from "./actionType";

const addToCart = (product) => {
    return {
        type: actionType.ADD_TO_CART,
        payload: product
    };
}


const deleteFromCart = (product) => {
    return {
        type: actionType.DETELE_FROM_CART,
        payload: product
    };
}

const updateCart = (product) => {
    return {
        type: actionType.UPDATE_CART,
        payload: product
    }
}

const deleteAllCart = () => {
    return {
        type: actionType.DELETE_ALL_CART
    }
}
export { addToCart, deleteFromCart, updateCart, deleteAllCart } 
