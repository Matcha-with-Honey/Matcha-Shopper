import React, { Component } from 'react';
import { connect } from 'redux';
import { fetchSingleProduct, persistProductDelete } from '../redux/products';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  async componentDidMount() {
    try {
      await this.props.fetchSingleProduct(this.props.match.params.productId);
    } catch (error) {
      console.error(error);
    }
  }

  handleDelete() {
    this.props.persistProductDelete(this.props.product.id);
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
            <p>{product.price}</p>
            <p>{product.description}</p>
            <button id="delete-product" onClick={this.handleDelete}>
              Delete
            </button>
          </section>
        ) : (
          <section id="single-product-container">
            <h2 id="product-name">{product.name}</h2>
            <img src={product.image} />
            <p>{product.price}</p>
            <p>{product.description}</p>
            <button id="add-to-cart">Add To Cart</button>
          </section>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product,
    role: state.auth.role,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    persistProductDelete: (id) => dispatch(persistProductDelete(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
