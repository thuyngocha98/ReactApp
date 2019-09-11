import { combineReducers } from 'redux';
// import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'

// Import reducer component
import productReducer from './productReducer';
import placeReducer from './placeReducer';


const rootReducer = combineReducers({
    products: productReducer,
    places: placeReducer
});

export default rootReducer;