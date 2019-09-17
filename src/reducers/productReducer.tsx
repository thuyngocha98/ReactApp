import { RECEIVE_PRODUCTS } from "../actions/ActionTypes";


const initialState = {
    products: []
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        // case RECEIVE_PRODUCTS_CATEGORY:
        //     return { ...state,
        //         products: action.products };
        case RECEIVE_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        default:
            return state;
    }
};
export default productReducer;
