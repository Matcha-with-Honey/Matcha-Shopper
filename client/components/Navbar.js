import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/auth';

const Navbar = (props) => {
  const { handleClick, isLoggedIn } = props;
  return (
    <div>
      <h1>Matcha 🍵</h1>
      <nav>
        {isLoggedIn && props.role === 'admin' && (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/users">Users</Link>
            <Link to="/cart">Cart</Link>
            <a onClick={handleClick}>Logout</a>
          </div>
        )}{' '}
        {isLoggedIn && props.role === 'member' && (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/account">Account</Link>
            <Link to="/cart">Cart</Link>
            <a onClick={handleClick}>Logout</a>
          </div>
        )}
        {!isLoggedIn && (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: state.authReducer.id ? true : false,
    role: state.authReducer.role,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
