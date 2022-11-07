import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import appReducer from './redux/auth';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

let middleware = [thunkMiddleware.withExtraArgument({ axios }), createLogger()];

const store = createStore(appReducer, applyMiddleware(...middleware));

export default store;
