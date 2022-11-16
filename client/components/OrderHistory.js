import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOrderHistory } from '../redux/orderHistory';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    try {
      this.props.fetchOrderHistory(this.props.params.userId);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { orderHistory } = this.props;
    return (
      <section>
        <div>
          {orderHistory.map((orders, index) => {
            return (
              <div key={index} id="order-history">
                <p>Order Date: {orders.updatedAt.slice(0, 10)}</p>
                <p>
                  Order Total: <strong>${orders.order_total}</strong>
                </p>
                <div>
                  {orders.order_products.map((item, index) => {
                    return (
                      <div key={index}>
                        {this.props.products.map((product) => {
                          if (product.id === item.id) {
                            return <strong>{product.name}</strong>;
                          }
                        })}
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

const mapState = (state) => {
  return {
    orderHistory: state.orderHistoryReducer,
    products: state.productsReducer.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrderHistory: (userId) => dispatch(fetchOrderHistory(userId)),
  };
};

export default withParams(connect(mapState, mapDispatch)(OrderHistory));
