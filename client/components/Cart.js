import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchNewCart,
  fetchSingleCart,
  updateItem,
  updateOrder,
} from '../redux/orders';

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkoutComplete: false,
    };
    this.sumTotal = this.sumTotal.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
  }

  makeOpts(item) {
    const opts = [];
    for (let i = 1; i <= item.product.quantity; i++) {
      opts.push(
        <option key={`${item.id}-opt-${i}`} value={i}>
          {i}
        </option>
      );
    }
    return opts;
  }

  preciseCurrencyAddition(valPairArr) {
    const splitVals = valPairArr.map((val) => {
      return val.split('');
    });
    const digitScalingInt = splitVals.map((splitDigits) => {
      const intDigits = splitDigits.indexOf('.');
      return splitDigits.splice(0, intDigits);
    });

    const int1 = parseInt(digitScalingInt[0].join(''));
    const int2 = parseInt(digitScalingInt[1].join(''));
    const addedInt = int1 + int2;

    const scaledDec1 = parseFloat(splitVals[0].join('')) * 100;
    const scaledDec2 = parseFloat(splitVals[1].join('')) * 100;
    const addedDec = (scaledDec1 + scaledDec2) / 100;

    const preciseTotal = (addedInt + addedDec).toFixed(2);

    return preciseTotal;
  }

  sumTotal(itemsArr) {
    const priceArr = itemsArr.map((item) => item.product.price);

    const total = priceArr.reduce((acc, price) => {
      return this.preciseCurrencyAddition([acc, price]);
    }, '0.00');

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(total);
  }

  handlePurchase(e) {
    // e.preventDefault();
    try {
      this.props.updateOrderOnPurchase({
        ...this.props.order,
        purchase_status: true,
      });
      this.setState({ ...this.state, checkoutComplete: true });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const items = this.props.cartItems || [];
    return (
      <div id="cart">
        {this.state.checkoutComplete === true &&
        this.props.order.purchase_status === true ? (
          <div>
            <h2>Checkout Complete</h2>
          </div>
        ) : (
          <div>
            <h2>Ready to checkout?</h2>
            <div id="cart-container">
              <div id="item-list">
                {items.length > 0 ? (
                  <div>
                    <h3>Your Items</h3>
                    {items.map((item) => {
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
                              <option value={item.quantity}>
                                {item.quantity}
                              </option>
                              {this.makeOpts(item)}
                            </select>
                          </form>
                        </div>
                      );
                    })}
                    <h3>Total: {this.sumTotal(items)}</h3>
                    <form>
                      <button
                        type="submit"
                        onClick={(e) => this.handlePurchase(e)}
                      >
                        Complete Purchase
                      </button>
                    </form>
                  </div>
                ) : (
                  <div>No items in cart</div>
                )}
              </div>
            </div>
          </div>
        )}
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
    fetchNewCart: () => dispatch(fetchNewCart()),
    updateOrderOnPurchase: (order) => dispatch(updateOrder(order)),
    updateItem: (updatedItem) => dispatch(updateItem(updatedItem)),
  };
};
export default connect(mapState, mapDispatch)(Cart);
