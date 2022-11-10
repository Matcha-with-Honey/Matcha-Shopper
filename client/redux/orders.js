import axios from 'axios';

const SET_NEW_CART = 'SET_NEW_CART';
const SET_SINGLE_CART = 'GET_SINGLE_CART';

export const setNewCart = (cart) => ({
  type: SET_NEW_CART,
  cart,
});

export const setSingleCart = (cart) => ({
  type: SET_SINGLE_CART,
  cart,
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

export const fetchSingleCart = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/orders/:id');
      dispatch(setNewCart(data));
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
  }
};

export default orderReducer;
