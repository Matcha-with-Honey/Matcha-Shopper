import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleCart } from '../redux/orders';
import { useParams } from 'react-router-dom';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
    };
  }

  componentDidMount() {
    try {
      // const items = this.props.fetchSingleCart(this.props.params.cartId);
      // this.setState({ ...this.state, cartItems: items });
      // const order = localStorage.get;
      // this.setState(cart);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div id="cart">
        <h2>Ready to checkout?</h2>
        <div id="cart-container">
          <h3>Your Items</h3>
          <div id="item-list">
            {this.state.cartItems.length > 0 ? (
              this.state.cartItems.map((item) => {
                return (
                  <div key="item.productId" className="cart-item">
                    <div id="cart-item-left">
                      <h4>item.product.name</h4>
                      <img src={item.image} />
                    </div>
                    <div id="cart-item-right">
                      <div id="item-price">item.product.price</div>
                    </div>
                    <form>
                      <select name="quanity" id="quantity-select">
                        <option value="item.quanity">item.quantity</option>
                      </select>
                    </form>
                  </div>
                );
              })
            ) : (
              <div>No items in cart</div>
            )}
          </div>
          <button>Complete Purchase</button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    order: state.orderReducer.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleCart: dispatch(() => fetchSingleCart()),
  };
};
export default withParams(connect(mapState, mapDispatch)(Cart));
