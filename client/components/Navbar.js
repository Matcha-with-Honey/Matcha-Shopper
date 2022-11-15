import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/auth';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  logoutHandler() {
    this.props.handleClick();
    window.location.reload();
  }

  render() {
    const { isLoggedIn, userId } = this.props;
    console.log(this.props);
    return (
      <div>
        <h1>ALL Match</h1>
        <nav>
          {isLoggedIn && this.props.role === 'admin' && (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/users">Users</Link>
              <Link to="/cart">Cart</Link>
              <a onClick={() => this.logoutHandler()}>Logout</a>
            </div>
          )}{' '}
          {isLoggedIn && this.props.role === 'member' && (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to={`/users/${userId}`}>Account</Link>
              <Link to="/cart">Cart</Link>
              <a onClick={() => this.logoutHandler()}>Logout</a>
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
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: state.authReducer.id ? true : false,
    role: state.authReducer.role,
    userId: state.authReducer.id,
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
