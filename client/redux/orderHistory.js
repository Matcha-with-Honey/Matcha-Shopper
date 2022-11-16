import axios from 'axios';
import { combineReducers } from 'redux';

const FETCH_ORDER_HISTORY = 'FETCH_ORDER_HISTORY';

const getOrderHistory = (orderHistory) => {
  return {
    type: FETCH_ORDER_HISTORY,
    orderHistory,
  };
};

const fetchOrderHistory = (userId) => {
  return async (dispatch) => {
    try {
      const { data: orders } = await axios.get(
        `/api/orders/purchases/${userId}`
      );
      dispatch(getOrderHistory(orders));
    } catch (error) {
      console.log(error);
    }
  };
};
const orderHistoryReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ORDER_HISTORY:
      return action.orderHistory;
    default:
      return state;
  }
};

export { orderHistoryReducer, fetchOrderHistory };
