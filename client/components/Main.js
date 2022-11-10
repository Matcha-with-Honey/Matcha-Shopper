import React, { Component } from 'react';
import { Login, SignUp } from './AuthForm';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { me } from '../redux/auth';
import Home from './Home';
import AllProducts from './AllProducts';
import { fetchAllProducts } from '../redux/products';
import SingleProduct from './SingleProduct';
import AllUsers from './AllUsers';
import SingleUser from './SingleUser';

class Main extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.fetchAllProducts();
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
            <Route path="/users" element={<AllUsers />} />
            <Route path="/users/:userId" element={<SingleUser />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
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
  };
};

export default connect(mapState, mapDispatch)(Main);
