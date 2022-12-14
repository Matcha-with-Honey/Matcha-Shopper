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
          let guestCart = JSON.parse(window.localStorage.getItem('guestCart'));
          if (!guestCart) {
            await this.props.fetchNewCart();
            window.localStorage.setItem(
              'guestCart',
              JSON.stringify(this.props.order)
            );
          } else {
            await this.props.setSingleOrder(guestCart);
          }
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
            <img src={product.image} />
            <div id="inner-single-product">
              <h2 id="product-name">{product.name}</h2>
              <p>Quantity: {product.quantity}</p>
              <p>Price: {product.price}</p>
              <p>Description: {product.description}</p>
              <p>Category: {product.category}</p>
            </div>
            <UpdateProduct />
          </section>
        ) : (
          <section id="single-product-container">
            <img src={product.image} id="product-image-single" />
            <div id="inner-single-product">
              <h2 id="product-name">{product.name}</h2>
              <p id="product-desc">{product.description}</p>
              <p id="product-single-price">{product.price}</p>
              <div id="button-and-form">
                <form>
                  <select
                    name="quantity"
                    className="quantity-selector-single"
                    onChange={(e) => {
                      const quantityToAdd = parseInt(e.target.value);
                      this.setState({ ...this.state, quantityToAdd });
                    }}
                  >
                    {this.makeOpts(this.props.product)}
                  </select>
                </form>
                <button
                  id="button-products-single"
                  onClick={() => this.handleAddItem(product)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
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
