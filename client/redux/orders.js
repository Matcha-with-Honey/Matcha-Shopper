import axios from 'axios';

const SET_NEW_CART = 'SET_NEW_CART';
const SET_SINGLE_CART = 'GET_SINGLE_CART';
const ADD_ITEM = 'ADD_ITEM';

export const setNewCart = (cart) => ({
  type: SET_NEW_CART,
  cart,
});

export const setSingleCart = (cart) => ({
  type: SET_SINGLE_CART,
  cart,
});

export const setItem = (item) => ({
  type: ADD_ITEM,
  item,
});

export const fetchNewCart = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/orders');
      dispatch(setNewCart(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchSingleCart = (id) => {
  // note: order id -- get from state.order.id
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/:${id}`);
      dispatch(setNewCart(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addItem = (item) => {
  // note: item {orderId:, productId:, quantity:}
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/cart', item);
      dispatch(addItem(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = { order: null, cartItems: [] };
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_CART:
      return { ...state, order: action.cart };
    case SET_SINGLE_CART:
      return { ...state, order: action.cart };
    case ADD_ITEM: {
      const updatedItems = [...state.cartItems, action.item];
      return { ...state, cartItems: updatedItems };
    }
    default:
      return state;
  }
};

export default orderReducer;
