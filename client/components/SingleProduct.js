import React, { Component } from 'react';
import { connect } from 'redux';
import { fetchSingleProduct } from '../redux/products';

class SingleProduct extends Component {
  async componentDidMount() {
    try {
      await this.props.fetchSingleProduct(this.props.match.params.productId);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { product } = this.props;
    return (
      <section id="single-product-container">
        <h2 id="product-name">{product.name}</h2>
        <img src={product.image} />
        <p>{product.price}</p>
        <p>{product.description}</p>
        <button id="add-to-cart">Add To Cart</button>
      </section>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
