import * as types from './ActionTypes';
import api from '../api/api';
import Place from '../models/place';
import Product from '../models/product';


export const addPlace = (place: Place) => {
  return {
    type: types.ADD_PLACE,
    payload: place
  }
}

export const receiveProducts = (products : Product[]) => ({
    type: types.RECEIVE_PRODUCTS,
    payload: products
});

export const getTopProducts = (pageIndex = 1, pageSize = 8) => async (dispatch) => {
    var products = await api.getProducts(pageIndex, pageSize);
    dispatch(receiveProducts(products));
}

export const getDataUser = (data: any[]) => ({
  type: types.GET_API_DATA_USER,
  payload: data
});

export const getApiDataUser = () => async (dispatch) => {
  var data = await api._getDataUser();
  dispatch(getDataUser(data));
}