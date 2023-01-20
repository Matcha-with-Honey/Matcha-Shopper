import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import authReducer from './redux/auth';
import productsReducer from './redux/products';
import { usersReducer } from './redux/users';
import { orderHistoryReducer } from './redux/orderHistory';
import orderReducer from './redux/orders';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const appReducer = combineReducers({
  authReducer,
  productsReducer,
  usersReducer,
  orderReducer,
  orderHistoryReducer,
});

let middleware;
if (process.env.NODE_ENV === 'development') {
  middleware = [thunkMiddleware.withExtraArgument({ axios }), createLogger()];
} else {
  middleware = [thunkMiddleware.withExtraArgument({ axios })];
}

const store = configureStore({ reducer: appReducer, middleware: middleware });

export default store;
