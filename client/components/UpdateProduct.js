import React, { Component } from 'react';
import { connect } from 'react-redux';
import { persistProductUpdate } from '../redux/products';

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      quantity: null,
      image: '',
      price: null,
      category: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.persistProductUpdate(this.props.singleProduct.id, this.state);
    this.setState({
      name: '',
      description: '',
      quantity: null,
      image: '',
      price: null,
      category: '',
    });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    return (
      <section>
        <form id="update-product-form" onSubmit={this.handleSubmit}>
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
          <input type={submit}>UPDATE</input>
        </form>
      </section>
    );
  }
}

const mapState = (state) => {
  return {
    singleProduct: state.singleProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    persistProductUpdate: (productId, product) =>
      dispatch(persistProductUpdate(productId, product)),
  };
};

export default connect(mapState, mapDispatch)(UpdateProduct);
