import actionType from "../actions/actionType";

const initState = {
    cartStore: []
}

const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.ADD_TO_CART:
            const productInCart = state.cartStore.find(p => p.id === action.payload.id && p.colorCart === action.payload.colorCart && p.sizeCart === action.payload.sizeCart);
            if (!productInCart) {
                return { cartStore: [...state.cartStore, action.payload] };
            }
            else {
                let newCart = state.cartStore;
                const objIndex = newCart.findIndex(obj => obj.id === action.payload.id && obj.colorCart === action.payload.colorCart && obj.sizeCart === action.payload.sizeCart);
                newCart[objIndex].soluong = newCart[objIndex].soluong + action.payload.soluong;
                return { cartStore: [...newCart] };
            }
        case actionType.DETELE_FROM_CART:
            let newCart = state.cartStore;
            const objIndex = newCart.findIndex(obj => obj.id === action.payload.id && obj.colorCart === action.payload.colorCart && obj.sizeCart === action.payload.sizeCart);
            newCart.splice(objIndex, 1);
            return { cartStore: [...newCart] };
        case actionType.UPDATE_CART:
            let newCartUpdate = state.cartStore
            const objIndexUpdate = newCartUpdate.findIndex(obj => obj.id === action.payload.id && obj.colorCart === action.payload.colorCart && obj.sizeCart === action.payload.sizeCart);
            newCartUpdate[objIndexUpdate] = action.payload
            return { cartStore: [...newCartUpdate] }
        case actionType.DELETE_ALL_CART:
            return { cartStore: [] }
        default:
            return state
    }
}

export default cartReducer;