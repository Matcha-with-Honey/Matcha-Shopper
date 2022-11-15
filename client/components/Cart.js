import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  deleteItem,
  fetchNewCart,
  fetchSingleCart,
  fetchSingleOrder,
  fetchUserLatestOrder,
  setSingleOrder,
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

  async componentDidMount() {
    try {
      if (this.props.isLoggedIn) {
        await this.props.fetchUserLatestOrder(this.props.cartFetcher);
        await this.props.fetchSingleOrder(this.props.order.id);
      } else {
        if (!this.props.order) {
          let guestCart = JSON.parse(window.localStorage.getItem('guestCart'));
          if (guestCart) {
            await this.props.fetchSingleOrder(guestCart.id);
            await this.props.fetchSingleCart(this.props.order.id);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
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

  handlePurchase() {
    try {
      this.props.updateOrderOnPurchase({
        ...this.props.order,
        purchase_status: true,
      });
      this.setState({ ...this.state, checkoutComplete: true });
      window.localStorage.removeItem('guestCart');
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
                    {this.props.cartItems.map((item) => {
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
                          <button
                            onClick={() => {
                              this.props.deleteItem(item);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                    <h3>Total: {this.sumTotal(items)}</h3>
                    <form>
                      <button
                        type="submit"
                        onClick={() => this.handlePurchase()}
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
    cartFetcher: state.authReducer.id,
    isLoggedIn: state.authReducer.id ? true : false,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleCart: (id) => dispatch(fetchSingleCart(id)),
    fetchUserLatestOrder: (userId) => dispatch(fetchUserLatestOrder(userId)),
    fetchNewCart: () => dispatch(fetchNewCart()),
    fetchSingleOrder: (id) => dispatch(fetchSingleOrder(id)),
    setSingleOrder: (order) => dispatch(setSingleOrder(order)),
    updateOrderOnPurchase: (order) => dispatch(updateOrder(order)),
    updateItem: (updatedItem) => dispatch(updateItem(updatedItem)),
    deleteItem: (item) => dispatch(deleteItem(item)),
  };
};
export default connect(mapState, mapDispatch)(Cart);
