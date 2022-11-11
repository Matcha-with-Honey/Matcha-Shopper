import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleCart, updateItem } from '../redux/orders';

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusItem: null,
      newQuantity: null,
    };
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
  }

  makeOpts(item) {
    const opts = [];
    for (let i = 0; i <= item.product.quantity; i++) {
      opts.push(
        <option key={`${item.id}-opt-${i}`} value={i}>
          {i}
        </option>
      );
    }
    return opts;
  }

  handleQuantityChange(e, item) {}

  handlePurchase() {}

  render() {
    const items = this.props.cartItems || [];
    return (
      <div id="cart">
        <h2>Ready to checkout?</h2>
        <div id="cart-container">
          <h3>Your Items</h3>
          <div id="item-list">
            {items.length > 0 ? (
              items.map((item) => {
                return (
                  <div key={item.productId} className="cart-item">
                    <div id="cart-item-left">
                      <h4>{item.product.name}</h4>
                      <img src={item.image} />
                    </div>
                    <div id="cart-item-right">
                      <div id="item-price">{item.product.price}</div>
                    </div>
                    <form>
                      <select
                        name="quantity"
                        id="quantity-select"
                        onChange={(e) => {
                          const quantity = parseInt(e.target.value);
                          const updatedItem = {
                            ...item,
                            quantity,
                          };
                          this.props.updateItem(updatedItem);
                        }}
                      >
                        <option value="item.quantity">{item.quantity}</option>
                        {this.makeOpts(item)}
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
    cartItems: state.orderReducer.cartItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleCart: dispatch(() => fetchSingleCart()),
    updateItem: (updatedItem) => dispatch(updateItem(updatedItem)),
  };
};
export default connect(mapState, mapDispatch)(Cart);
