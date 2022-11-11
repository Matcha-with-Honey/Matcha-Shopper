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
} from '../redux/orders';
import SingleProduct from './SingleProduct';
import Cart from './Cart';
import AllUsers from './AllUsers';
import SingleUser from './SingleUser';

class Main extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.fetchAllProducts();
    //this.props.fetchNewCart();
    const cart = this.props.fetchSingleCart(1);
    if (cart) {
      this.props.fetchSingleOrder(1);
    }
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/users/:userId" element={<SingleUser />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        )}
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    // isLoggedIn: state.auth ? true : false,
    isLoggedIn: true,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => dispatch(me()),
    fetchAllProducts: () => dispatch(fetchAllProducts()),
    fetchNewCart: () => dispatch(fetchNewCart()),
    fetchSingleCart: (id) => dispatch(fetchSingleCart(id)),
    fetchSingleOrder: (id) => dispatch(fetchSingleOrder(id)),
  };
};

export default connect(mapState, mapDispatch)(Main);
