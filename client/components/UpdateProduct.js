import React, { Component } from 'react';
import { connect } from 'react-redux';
import { persistProductUpdate } from '../redux/products';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.persistProductUpdate(this.props.singleProduct, this.state);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  componentDidUpdate(prevProps) {
    const { name, description, quantity, image, price, category } =
      this.props.singleProduct;
    if (prevProps.singleProduct.id !== this.props.singleProduct.id) {
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

  handleAlert(event) {
    event.preventDefault();
    return toast('Name, price, quantity and category must be defined.');
  }

  render() {
    return (
      <section>
        <form
          id="update-product-form"
          onSubmit={(event) => {
            if (
              event.target.name.value !== '' &&
              event.target.price.value !== '' &&
              event.target.quantity.value !== '' &&
              event.target.category.value !== ''
            ) {
              this.handleSubmit(event);
            } else {
              this.handleAlert(event);
            }
          }}
        >
          <input
            name="name"
            placeholder="product name"
            value={this.state.name}
            onChange={this.handleChange}
          ></input>
          <input
            name="description"
            placeholder="description"
            value={this.state.description}
            onChange={this.handleChange}
          ></input>
          <input
            name="quantity"
            placeholder="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          ></input>
          <input
            name="image"
            placeholder="image"
            value={this.state.image}
            onChange={this.handleChange}
          ></input>
          <input
            name="price"
            price
            placeholder="price"
            value={this.state.price}
            onChange={this.handleChange}
          ></input>
          <input
            name="category"
            placeholder="category"
            value={this.state.category}
            onChange={this.handleChange}
          ></input>
          <button type="submit">UPDATE</button>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={2700}
          hideProgressBar={true}
          closeOnClick="true"
        />
      </section>
    );
  }
}

const mapState = (state) => {
  return {
    singleProduct: state.productsReducer.singleProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    persistProductUpdate: (productId, product) =>
      dispatch(persistProductUpdate(productId, product)),
  };
};

export default connect(mapState, mapDispatch)(UpdateProduct);
