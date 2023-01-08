import React, { Component } from 'react';
import { connect } from 'react-redux';
import { persistAddedProduct } from '../redux/products';

class AddProduct extends Component {
  constructor() {
    super();
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
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.persistAddedProduct(this.state);
    this.setState({
      name: '',
      description: '',
      quantity: '',
      image: '',
      price: '',
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
        <form id="add-product-form" onSubmit={this.handleSubmit}>
          <input
            id="product-name-form"
            name="name"
            placeholder="product name"
            value={this.state.name}
            onChange={this.handleChange}
          ></input>
          <input
            id="product-desc-form"
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
            placeholder="image url"
            value={this.state.image}
            onChange={this.handleChange}
          ></input>
          <input
            name="price"
            placeholder="price"
            value={this.state.price}
            onChange={this.handleChange}
          ></input>
          <label id="category-label">CATEGORY:</label>
          <select name="category" onChange={this.handleChange}>
            <option></option>
            <option value={'tea'}>tea</option>
            <option value={'accessories'}>accessories</option>
          </select>
          <button type="submit">ADD PRODUCT</button>
        </form>
      </section>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    persistAddedProduct: (product) => dispatch(persistAddedProduct(product)),
  };
};

export default connect(null, mapDispatch)(AddProduct);
