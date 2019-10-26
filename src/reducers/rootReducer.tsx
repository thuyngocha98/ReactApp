import { combineReducers } from 'redux';
// import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'

// Import reducer component
import productReducer from './productReducer';
import placeReducer from './placeReducer';
import dataUserReducer from './dataUserReducer';


const rootReducer = combineReducers({
    products: productReducer,
    places: placeReducer,
    dataUser: dataUserReducer,
});

export default rootReducer;