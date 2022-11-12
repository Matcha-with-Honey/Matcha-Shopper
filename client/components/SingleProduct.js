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
    this.state = {
      quantityToAdd: 0,
    };
  }
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.params.productId);
  }

  makeOpts(product) {
    const opts = [];
    for (let i = 1; i <= product.quantity; i++) {
      opts.push(
        <option key={`${product.id}-opt-${i}`} value={i}>
          {i}
        </option>
      );
    }
    return opts;
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
            <form>
              <select
                name="quantity"
                id="quantity-select"
                onChange={(e) => {
                  const quantityToAdd = parseInt(e.target.value);
                  this.setState({ ...this.state, quantityToAdd });
                }}
              >
                {this.makeOpts(this.props.product)}
              </select>
            </form>
            <button
              id="add-to-cart"
              onClick={() =>
                this.props.addItem(
                  product.id,
                  this.props.order.id,
                  this.state.quantityToAdd
                )
              }
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
    role: state.authReducer.role,
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
