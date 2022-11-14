import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../redux/products';
import { addItem, fetchNewCart } from '../redux/orders';
import { useParams } from 'react-router-dom';
import UpdateProduct from './UpdateProduct';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityToAdd: 1,
    };
    this.handleAddItem = this.handleAddItem.bind(this);
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

  async handleAddItem(product) {
    try {
      let quantity = this.state.quantityToAdd;
      if (!this.props.order) {
        if (!this.props.isLoggedIn) {
          await this.props.fetchNewCart();
          this.props.addItem(product.id, this.props.order.id, quantity);
        } else {
          await this.props.fetchNewCart(this.props.cartFetcher);
          this.props.addItem(product.id, this.props.order.id, quantity);
        }
      } else {
        this.props.addItem(product.id, this.props.order.id, quantity);
      }
    } catch (error) {
      console.error(error);
    }
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
              onClick={() => this.handleAddItem(product)}
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
    isLoggedIn: state.authReducer.id ? true : false,
    role: state.authReducer.role,
    cartFetcher: state.authReducer.id,
    order: state.orderReducer.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    addItem: (productId, orderId, qty) =>
      dispatch(addItem(productId, orderId, qty)),
    fetchNewCart: (id) => dispatch(fetchNewCart(id)),
  };
};

export default withParams(connect(mapState, mapDispatch)(SingleProduct));
