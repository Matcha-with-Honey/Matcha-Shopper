import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../redux/products';
import { addItem } from '../redux/orders';
import { useParams } from 'react-router-dom';
import UpdateProduct from './UpdateProduct';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class SingleProduct extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.params.productId);
  }

  render() {
    const { product } = this.props;
    const { role } = this.props;

    return (
      <div>
        {role === 'admin' ? (
          <section id="single-product-container">
            <h2 id="product-name">{product.name}</h2>
            <img src={product.image} />
            <p>Quantity: {product.quantity}</p>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
            <p>Category: {product.category}</p>

            <UpdateProduct />
          </section>
        ) : (
          <section id="single-product-container">
            <h2 id="product-name">{product.name}</h2>
            <img src={product.image} />
            <p>{product.price}</p>
            <p>{product.description}</p>
            <button
              id="add-to-cart"
              onClick={() => this.props.addItem(product.id, 1, 1)}
            >
              Add To Cart
            </button>
          </section>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.productsReducer.singleProduct,
    role: state.authRouter.role,
    order: state.orderReducer.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    addItem: (productId, orderId, qty) =>
      dispatch(addItem(productId, orderId, qty)),
  };
};

export default withParams(connect(mapState, mapDispatch)(SingleProduct));
