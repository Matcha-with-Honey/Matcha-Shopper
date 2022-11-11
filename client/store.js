import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import authReducer from './redux/auth';
import productsReducer from './redux/products';
import { usersReducer } from './redux/users';
import orderReducer from './redux/orders';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const appReducer = combineReducers({
  authReducer,
  productsReducer,
  usersReducer,
  orderReducer,
});

let middleware = [thunkMiddleware.withExtraArgument({ axios }), createLogger()];

const store = createStore(appReducer, applyMiddleware(...middleware));

export default store;
