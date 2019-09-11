import { createStore, applyMiddleware, compose } from 'redux';

// middlewares
import thunkMiddleware from 'redux-thunk';

// Import custom components
import rootReducer from '../reducers/rootReducer';



/**
 * Create a Redux store that holds the app state.
 */
const initialState = {}
const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunkMiddleware),

  
));

export default store;