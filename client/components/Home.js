import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;
  return username ? (
    <div>
      <h3>Welcome, {username}</h3>
    </div>
  ) : (
    <div>
      <h3>Welcome!</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.authReducer.first_name,
  };
};

export default connect(mapState)(Home);
