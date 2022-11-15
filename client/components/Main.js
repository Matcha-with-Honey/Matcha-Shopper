import React, { Component } from 'react';
import { Login, SignUp } from './AuthForm';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { me } from '../redux/auth';
import Home from './Home';
import AllProducts from './AllProducts';
import { fetchAllProducts, fetchSingleProduct } from '../redux/products';
import {
  fetchNewCart,
  fetchSingleCart,
  fetchSingleOrder,
  fetchUserLatestOrder,
} from '../redux/orders';
import SingleProduct from './SingleProduct';
import Cart from './Cart';
import AllUsers from './AllUsers';
import SingleUser from './SingleUser';

class Main extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.fetchAllProducts();
    if (this.props.isLoggedIn) {
      try {
        this.props.fetchUserLatestOrder(this.props.cartFetcher);
      } catch (error) {
        console.error(error);
      }
    }
  }
  async componentDidUpdate() {
    if (this.props.isLoggedIn) {
      try {
        if (this.props.order === null) {
          await this.props.fetchUserLatestOrder(this.props.cartFetcher);
          if (this.props.order) {
            await this.props.fetchSingleCart(this.props.order.id);
          }

          const cart = this.props.order;
          if (cart && cart.purchase_status === true) {
            await this.props.fetchNewCart(this.props.cartFetcher);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/users/:userId" element={<SingleUser />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        )}
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    isLoggedIn: state.authReducer.id ? true : false,
    cartFetcher: state.authReducer.id,
    order: state.orderReducer.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => dispatch(me()),
    fetchAllProducts: () => dispatch(fetchAllProducts()),
    fetchNewCart: (id) => dispatch(fetchNewCart(id)),
    fetchSingleCart: (id) => dispatch(fetchSingleCart(id)),
    fetchUserLatestOrder: (userId) => dispatch(fetchUserLatestOrder(userId)),
    fetchSingleOrder: (id) => dispatch(fetchSingleOrder(id)),
  };
};

export default connect(mapState, mapDispatch)(Main);
