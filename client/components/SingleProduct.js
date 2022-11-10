import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct, persistProductDelete } from '../redux/products';
import { useParams } from 'react-router-dom';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  async componentDidMount() {
    try {
      await this.props.fetchSingleProduct(this.props.params.productId);
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
            {/* {UPDATE FORM GOES HERE} */}
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
    product: state.productsReducer.singleProduct,
    role: 'admin',
    // THIS IS HARDCODED. NEEDS TO CHANGE!!!
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    persistProductDelete: (id) => dispatch(persistProductDelete(id)),
  };
};

export default withParams(connect(mapState, mapDispatch)(SingleProduct));
