import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddProduct from './AddProduct';
import { persistProductDelete } from '../redux/products';
import { addItem, fetchNewCart, setSingleOrder } from '../redux/orders';

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantities: new Map(),
    };
    this.handleAddItem = this.handleAddItem.bind(this);
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
      let quantity = this.state.quantities.get(product.id);
      quantity = quantity ? quantity : 1;
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
    const { products } = this.props;
    const { role } = this.props;
    return (
      <section>
        {role === 'admin' ? (
          <div>
            <Link id="add-product-link" to={'/products-add'}>
              ADD PRODUCT
            </Link>
            <table id="product">
              <tbody>
                <tr>
                  <th>PRODUCT NAME</th>
                  <th>ID</th>
                  <th>QUANTITY</th>
                  <th>PRICE</th>
                  <th>DESCRIPTION</th>
                  <th>CATEGORY</th>
                  <th>DELETE</th>
                </tr>
                {products.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td id="product-name-admin">
                        <a id="see-more" href={`/products/${product.id}`}>
                          {product.name}
                        </a>
                      </td>
                      <td>{product.id}</td>
                      <td>{product.quantity}</td>
                      <td>${product.price}</td>
                      <td id="product-description-admin">
                        {product.description}
                      </td>
                      <td>{product.category}</td>
                      <td>
                        <button
                          id="button-products"
                          onClick={() => {
                            this.props.persistProductDelete(product.id);
                          }}
                        >
                          x
                        </button>{' '}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div id="products-container">
            {products.map((product) => {
              return (
                <div key={product.id} id="product">
                  <img id="product-image" src={product.image} />
                  <div id="product-info">
                    <div id="inner-product-details">
                      <Link to={`/products/${product.id}`}>
                        {' '}
                        <span id="product-name">
                          {product.name.toUpperCase()}
                        </span>
                      </Link>
                      <span id="product-price">{`$ ${product.price}`}</span>
                    </div>
                    <div id="add-to-cart">
                      <form>
                        <select
                          name="quantity"
                          id={`quantity-select-${product.id}`}
                          className="quantity-selector"
                          onChange={(e) => {
                            const quantityToAdd = parseInt(e.target.value);
                            const quantities = this.state.quantities;
                            quantities.set(product.id, quantityToAdd);
                            this.setState({ ...this.state, quantities });
                          }}
                        >
                          {this.makeOpts(product)}
                        </select>
                      </form>
                      <button
                        onClick={() => this.handleAddItem(product)}
                        id="button-products"
                      >
                        add to cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.productsReducer.products,
    isLoggedIn: state.authReducer.id ? true : false,
    role: state.authReducer.role,
    cartFetcher: state.authReducer.id,
    order: state.orderReducer.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    persistProductDelete: (id) => dispatch(persistProductDelete(id)),
    addItem: (productId, orderId, qty) =>
      dispatch(addItem(productId, orderId, qty)),
    fetchNewCart: (id) => dispatch(fetchNewCart(id)),
    setSingleOrder: (order) => dispatch(setSingleOrder(order)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
