import { GET_LIST_TRIP } from "../actions/ActionTypes";


const initialState = {
    listAllTrip: []
};

const listAllTripReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_TRIP:
            return {
                ...state,
                listAllTrip: action.payload
            };
        default:
            return state;
    }
};
export default listAllTripReducer;
