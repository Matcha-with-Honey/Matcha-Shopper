import axios from 'axios';
import { combineReducers } from 'redux';

const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

const setProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

const setSingleProduct = (product) => {
  return {
    type: GET_SINGLE_PRODUCT,
    product,
  };
};

const updateProduct = (updatedProduct) => {
  return {
    type: UPDATE_PRODUCT,
    updatedProduct,
  };
};

export const fetchAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products');
      dispatch(setProducts(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(setSingleProduct(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const persistUpdate = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/products/${product.id}`, product);
      dispatch(updateProduct(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const allProductsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};

const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product;
    case UPDATE_PRODUCT:
      return action.updatedProduct;
    default:
      return state;
  }
};

const productsReducer = combineReducers({
  allProducts: allProductsReducer,
  singleProduct: singleProductReducer,
});
