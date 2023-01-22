import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct, persistProductUpdate } from '../redux/products';
import { addItem, fetchNewCart } from '../redux/orders';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityToAdd: 1,
      name: '',
      description: '',
      quantity: '',
      image: '',
      price: '',
      category: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.params.productId);
  }

  componentDidUpdate(prevProps) {
    const { name, description, quantity, image, price, category } =
      this.props.product;
    if (prevProps.product.id !== this.props.product.id) {
      this.setState({
        name,
        description,
        quantity,
        image,
        price,
        category,
      });
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.persistProductUpdate(this.props.product, this.state);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleAlert(event) {
    event.preventDefault();
    return toast(`The information has been updated.`);
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
    const { role } = this.props;
    const { product } = this.props;
    let { name, description, quantity, image, price, category } = this.state;

    return (
      <div>
        {role === 'admin' ? (
          <section id="single-product-container">
            <img id="product-image-single" src={product.image} />
            <form
              id="inner-single-product-update"
              onSubmit={(event) => {
                this.handleSubmit(event);
                this.handleAlert(event);
              }}
            >
              <label>PRODUCT NAME</label>
              <input
                id="product-name-update"
                name="name"
                value={name}
                onChange={this.handleChange}
              ></input>
              <label>DESCRIPTION</label>
              <input
                id="product-description-update"
                name="description"
                value={description}
                onChange={this.handleChange}
              ></input>
              <label>QUANTITY</label>
              <input
                name="quantity"
                value={quantity}
                onChange={this.handleChange}
              ></input>
              <label>IMAGE URL</label>
              <input
                name="image url"
                value={image}
                onChange={this.handleChange}
              ></input>
              <label>PRICE</label>
              <input
                name="price"
                value={price}
                onChange={this.handleChange}
              ></input>
              <label>CATEGORY</label>
              <input
                name="category"
                placeholder="category"
                value={category}
                onChange={this.handleChange}
              ></input>
              <button type="submit">UPDATE</button>
            </form>
            <ToastContainer
              position="top-center"
              autoClose={1700}
              hideProgressBar={true}
              closeOnClick="true"
            />
          </section>
        ) : (
          <section id="single-product-container">
            <img src={product.image} id="product-image-single" />
            <div id="inner-single-product">
              <h2 id="single-product-name">{product.name}</h2>
              <p id="single-product-desc">{product.description}</p>
              <p id="product-single-price">${product.price}</p>
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
    persistProductUpdate: (productId, product) =>
      dispatch(persistProductUpdate(productId, product)),
  };
};

export default withParams(connect(mapState, mapDispatch)(SingleProduct));
