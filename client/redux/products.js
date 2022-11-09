import axios from 'axios';
import { combineReducers } from 'redux';

const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

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

const deleteProduct = (deletedProduct) => {
  return {
    type: DELETE_PRODUCT,
    deletedProduct,
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

export const persistProductUpdate = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/products/${product.id}`, product);
      dispatch(updateProduct(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const persistProductDelete = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/products/${id}`);
      dispatch(deleteProduct(data));
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
    case DELETE_PRODUCT:
      return action.deletedProduct;
    default:
      return state;
  }
};

const productsReducer = combineReducers({
  allProducts: allProductsReducer,
  singleProduct: singleProductReducer,
});
