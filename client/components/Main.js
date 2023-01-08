import React, { Component } from 'react';
import { Login, SignUp } from './AuthForm';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { me } from '../redux/auth';
import Home from './Home';
import AllProducts from './AllProducts';
import { fetchAllProducts } from '../redux/products';
import {
  fetchNewCart,
  fetchSingleCart,
  fetchSingleOrder,
  fetchUserLatestOrder,
  updateItems,
  updateOrder,
} from '../redux/orders';
import SingleProduct from './SingleProduct';
import Cart from './Cart';
import AllUsers from './AllUsers';
import SingleUser from './SingleUser';
import CheckOut from './Checkout';
import AddProduct from './AddProduct';

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
        } else {
          if (!this.props.order.userId) {
            const guestCart = JSON.parse(
              window.localStorage.getItem('guestCart')
            );
            await this.props.fetchUserLatestOrder(this.props.cartFetcher);
            if (guestCart) {
              if (!this.props.order.userId) {
                await this.props.updateOrder(
                  this.props.order,
                  this.props.cartFetcher
                );
              } else {
                const { id } = guestCart;
                await this.props.updateItems(id, this.props.order.id);
              }
              window.localStorage.removeItem('guestCart');
            } else {
              await this.props.fetchUserLatestOrder(this.props.cartFetcher);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  render() {
    const { isLoggedIn } = this.props;
    const { isAdmin } = this.props;
    return (
      <div>
        <section id="logo-wrapper">
          <img src="Untitled-2.png" id="logo"></img>
        </section>
        {isLoggedIn ? (
          <Routes>
            {isAdmin ? (
              <Route exact path="products-add" element={<AddProduct />} />
            ) : null}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/users/:userId" element={<SingleUser />} />
            <Route path="/checkout" element={<CheckOut />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
          </Routes>
        )}
        <footer>
          <a href="mailto:info@allmatcha.com" id="footer-contact">
            CONTACT
          </a>
          <span id="footer-based">BASED IN NEW YORK, NY</span>
        </footer>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    isLoggedIn: state.authReducer.id ? true : false,
    isAdmin: state.authReducer.role === 'admin' ? true : false,
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
    updateOrder: (orderId, userId) => dispatch(updateOrder(orderId, userId)),
    updateItems: (guestOrderId, userOrderId) =>
      dispatch(updateItems(guestOrderId, userOrderId)),
  };
};

export default connect(mapState, mapDispatch)(Main);
