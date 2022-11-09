import React, { Component } from 'react';
import { connect } from 'react-redux';

class AllProducts extends Component {
  render() {
    const { products } = this.props;
    return (
      <section>
        <h2 id="products-title">ALL PRODUCTS</h2>
        <div id="products-container">
          {products.map((product) => {
            return (
              <div key={product.id} id="product">
                <Link to={`/products/${product.id}`}>
                  {' '}
                  <p>{product.name}</p>
                </Link>
                <img id="product-image" src={product.image} />
                <p>{product.price}</p>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapState)(AllProducts);
