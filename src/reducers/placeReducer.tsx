import { ADD_PLACE } from '../actions/ActionTypes';

const initialState = {
  placeName: '',
  places: []
};

const placeReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PLACE:
      return {
        ...state,
          places: state.places.concat(action.payload)};
    default:
      return state;
  }
}

export default placeReducer;
