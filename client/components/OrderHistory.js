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
    console.log('====', this.props.orderHistory);
    const { orderHistory } = this.props;

    return (
      <section>
        <div>
          {orderHistory.map((orders) => {
            return (
              <div key={orders.id}>
                <p>Order Date: {orders.updatedAt}</p>
                <p>Order Total: {orders.order_total}</p>
                <div>
                  {orders.order_products.map((item) => {
                    return (
                      <div key={item.id}>
                        <p>Item:</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {/* <div>{order_products.map}</div>
        <p>Total: {order_total}<p/> */}
      </section>
    );
  }
}

const mapState = (state) => {
  return {
    orderHistory: state.orderHistoryReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrderHistory: (userId) => dispatch(fetchOrderHistory(userId)),
  };
};

export default withParams(connect(mapState, mapDispatch)(OrderHistory));
