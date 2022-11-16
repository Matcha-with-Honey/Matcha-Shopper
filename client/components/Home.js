import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const Home = (props) => {
  return (
    <div>
      <section id="home-main">
        <h1 id="store-name">ALL MATCHA</h1>
        <img id="home-image" src="homePage.jpg"></img>
        <p id="home-desc">Where you find all things matcha</p>
        <Link to="/products">SHOP NOW</Link>
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
