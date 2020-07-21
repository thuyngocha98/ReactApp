import { GET_API_DATA_USER } from "../actions/ActionTypes";


const initialState = {
    dataUser: []
};

const dataUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_API_DATA_USER:
            return {
                ...state,
                dataUser: action.payload
            };
        default:
            return state;
    }
};
export default dataUserReducer;
