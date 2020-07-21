import { GET_LIST_USER_IN_TRIP } from "../actions/ActionTypes";


const initialState = {
    listUserInTrip: []
};

const listUserInTripReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_USER_IN_TRIP:
            return {
                ...state,
                listUserInTrip: action.payload
            };
        default:
            return state;
    }
};
export default listUserInTripReducer;
