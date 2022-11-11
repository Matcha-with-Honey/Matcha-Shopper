import axios from 'axios';

const SET_NEW_CART = 'SET_NEW_CART';
const SET_SINGLE_ORDER = 'SET_SINGLE_ORDER';
const SET_SINGLE_CART = 'GET_SINGLE_CART';
const ADD_ITEM = 'ADD_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';

export const setNewCart = (order) => ({
  type: SET_NEW_CART,
  order,
});

export const setSingleOrder = (order) => ({
  type: SET_SINGLE_ORDER,
  order,
});

export const setSingleCart = (cart) => ({
  type: SET_SINGLE_CART,
  cart,
});

export const setItem = (item) => ({
  type: ADD_ITEM,
  item,
});

export const updatedItem = (items) => ({
  type: UPDATE_ITEM,
  items,
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

export const fetchSingleOrder = (id) => {
  // note: order id -- get from state.order.id
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/${id}`);
      dispatch(setSingleOrder(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchSingleCart = (id) => {
  // note: order id -- get from state.order.id
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/${id}`);
      dispatch(setSingleCart(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addItem = (productId, orderId, qty) => {
  // note: item {orderId:, productId:, quantity:}
  return async (dispatch) => {
    try {
      const item = { productId, orderId, quantity: qty };
      const { data } = await axios.post('/api/cart', item);
      dispatch(setItem(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateItem = (item) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/cart/${item.orderId}/${item.productId}`,
        {
          quantity: item.quantity,
        }
      );
      if (data) {
        const cartItems = await axios.get(`/api/cart/${item.orderId}`);
        dispatch(updatedItem(cartItems.data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = { order: null, cartItems: [] };
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_CART:
      return { ...state, order: action.order };
    case SET_SINGLE_ORDER:
      return { ...state, order: action.order };
    case SET_SINGLE_CART:
      return { ...state, cartItems: action.cart };
    case ADD_ITEM: {
      const updatedItems = [...state.cartItems, action.item];
      return { ...state, cartItems: updatedItems };
    }
    case UPDATE_ITEM:
      return { ...state, cartItems: action.items };
    default:
      return state;
  }
};

export default orderReducer;
