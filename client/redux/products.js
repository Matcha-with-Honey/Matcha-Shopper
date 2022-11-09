import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';

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
