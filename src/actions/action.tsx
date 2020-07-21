import * as types from './ActionTypes';
import api from '../api/api';
import Place from '../models/place';
import Product from '../models/product';


// export const addPlace = (place: Place) => {
//   return {
//     type: types.ADD_PLACE,
//     payload: place
//   }
// }

// export const receiveProducts = (products : Product[]) => ({
//     type: types.RECEIVE_PRODUCTS,
//     payload: products
// });

// export const getTopProducts = (pageIndex = 1, pageSize = 8) => async (dispatch) => {
//     var products = await api.getProducts(pageIndex, pageSize);
//     dispatch(receiveProducts(products));
// }

// GET API DATA USER
export const getDataUser = (data: any[]) => ({
  type: types.GET_API_DATA_USER,
  payload: data
});

export const getApiDataUser = () => async (dispatch) => {
  var data = await api._getDataUser();
  dispatch(getDataUser(data));
}

// GET LIST TRIP
export const getListTrip = (data: any[]) => ({
  type: types.GET_LIST_TRIP,
  payload: data
});

export const getApiListTrip = dataListAllTrip => async (dispatch) => {
  var data = dataListAllTrip;
  dispatch(getListTrip(data));
}

// GET LIST USER IN A TRIP
export const getListUserInTrip = (data: any[]) => ({
  type: types.GET_LIST_USER_IN_TRIP,
  payload: data
});

export const getApiListUserInTrip = tripId => async (dispatch) => {
  var data = await api._getAllUserInTrip(tripId);
  dispatch(getListUserInTrip(data));
}

// SAVE TRIP ID
export const saveTripId = (data: any[]) => ({
  type: types.SAVE_TRIP_ID,
  payload: data
});

export const saveTripIdInExpense = tripId => async (dispatch) => {
  var data = await api._saveTripId(tripId);
  dispatch(saveTripId(data));
}

