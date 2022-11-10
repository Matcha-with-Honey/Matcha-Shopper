import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser, deleteUser } from '../redux/users';
import { useParams, Link } from 'react-router-dom';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export class SingleUser extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    try {
      this.props.fetchSingleUser(this.props.params.userId);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { id, first_name, last_name, username, email } = this.props.user;
    return (
      <div>
        <h1>Welcome {first_name}</h1>
        <h3>Personal Information</h3>
        <ul>
          <li>
            Name: {first_name} {last_name}
          </li>
          <li>Username: {username}</li>
          <li>Email: {email}</li>
          <li>Password: **********</li>
          {/* click to edit */}
        </ul>
        <hr />
        <Link>
          <button type="button">Order History</button>
        </Link>
        <hr />
        <button
          type="submit"
          name={id}
          onClick={() => this.props.deleteUser(id)}
        >
          Delete User
        </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.usersReducer.singleUser,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleUser: (id) => {
      dispatch(fetchSingleUser(id));
    },
    deleteUser: (userId) => {
      dispatch(deleteUser(userId));
    },
  };
};
export default withParams(connect(mapState, mapDispatch)(SingleUser));
