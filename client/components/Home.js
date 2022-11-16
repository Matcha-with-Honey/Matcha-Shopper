import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const Home = (props) => {
  return (
    <div>
      <section id="home-main">
        <img id="home-image" src="homePage.jpg"></img>
        <div id="home-main-text-wrapper">
          <p id="home-desc">Where you find all things matcha</p>
          <Link to="/products">SHOP NOW</Link>
        </div>
      </section>
      <section id="about-store">
        <p>
          At All Matcha we truly care about your tea experience. Our mission is
          to make matcha accessible to anybody and everybody.
        </p>
      </section>
      <section id="product-highlight">
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/green-matcha-tea-powder-top-view-royalty-free-image-904776948-1555092847.jpg"
          id="product-home"
        ></img>
        <div id="product-highlight-text">
          <p id="product-highlight-desc">A delicious blend of green teas.</p>
          <Link to="/products/1">LEARN MORE</Link>
        </div>
      </section>
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.authReducer.first_name,
  };
};

export default connect(mapState)(Home);
