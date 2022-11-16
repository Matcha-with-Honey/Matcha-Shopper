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
    const { isLoggedIn, userId, userName } = this.props;

    return (
      <section id="nav-bar">
        {/* <h1>ALL Match</h1> */}
        <nav>
          {isLoggedIn && this.props.role === 'admin' && (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/">HOME</Link>
              <Link to="/products">PRODUCTS</Link>
              <span id="welcome-nav">
                {`WELCOME ${userName.toUpperCase()}! HOW ABOUT A CUP OF TEA?`}
              </span>{' '}
              <Link to="/users">USERS</Link>
              <Link to="/cart">CART</Link>
              <Link onClick={() => this.logoutHandler()}>LOGOUT</Link>
            </div>
          )}{' '}
          {isLoggedIn && this.props.role === 'member' && (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/" id="home-nav">
                HOME
              </Link>
              {/* <div id="nav-line"></div> */}
              <Link to="/products">PRODUCTS</Link>
              <span id="welcome-nav">
                {`WELCOME ${userName.toUpperCase()}! HOW ABOUT A CUP OF TEA?`}
              </span>

              <Link to={`/users/${userId}`}>ACCOUNT</Link>
              <Link to="/cart">CART</Link>
              <Link onClick={() => this.logoutHandler()}>LOGOUT</Link>
            </div>
          )}
          {!isLoggedIn && (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/">HOME</Link>
              <Link to="/products">PRODUCTS</Link>
              <span id="welcome-nav">
                {`WELCOME! HOW ABOUT A CUP OF TEA?`}
              </span>{' '}
              <Link to="/cart">CART</Link>
              <Link to="/login">LOGIN</Link>
              <Link to="/signup">SIGN UP</Link>
            </div>
          )}
        </nav>
      </section>
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
    userName: state.authReducer.first_name,
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
