import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddProduct from './AddProduct';
import { persistProductDelete } from '../redux/products';

class AllProducts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { products } = this.props;
    const { role } = this.props;
    return (
      <section>
        <h2 id="products-title">ALL PRODUCTS</h2>
        {role === 'admin' ? (
          <div>
            <AddProduct />
            <div id="products-container">
              {products.map((product) => {
                return (
                  <div key={product.id} id="product">
                    <Link to={`/products/${product.id}`}>
                      {' '}
                      <p>{product.name}</p>
                    </Link>
                    <img id="product-image" src={product.image} />
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: {product.price}</p>
                    <p>Description: {product.description}</p>
                    <p>Category: {product.quantity}</p>
                    <button
                      id="delete-product"
                      onClick={() => {
                        this.props.persistProductDelete(product.id);
                      }}
                    >
                      DELETE
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div id="products-container">
            {products.map((product) => {
              return (
                <div key={product.id} id="product">
                  <Link to={`/products/${product.id}`}>
                    {' '}
                    <p>{product.name}</p>
                    <img id="product-image" src={product.image} />
                  </Link>
                  <p>{product.price}</p>
                  <button>BUY NOW</button>
                  <button>ADD TO CART</button>
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
    role: 'member',
  };
};

const mapDispatch = (dispatch) => {
  return {
    persistProductDelete: (id) => dispatch(persistProductDelete(id)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
