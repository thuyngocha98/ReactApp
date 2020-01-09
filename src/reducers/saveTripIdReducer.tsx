import { SAVE_TRIP_ID } from "../actions/ActionTypes";


const initialState = {
    tripId: ''
};

const saveTripIdReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_TRIP_ID:
            return {
                ...state,
                tripId: action.payload
            };
        default:
            return state;
    }
};
export default saveTripIdReducer;
