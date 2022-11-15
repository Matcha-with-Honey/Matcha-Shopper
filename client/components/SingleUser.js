import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser } from '../redux/users';
import { useParams, Link } from 'react-router-dom';
import UpdateUser from './UpdateUser';

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
    const { id, first_name, last_name, username, phone, email } =
      this.props.user;
    console.log(this.props.user);
    return (
      <div>
        <h1>Welcome {first_name}</h1>
        <h3>Personal Information</h3>
        <ul>
          <li>
            Name: {first_name} {last_name}
          </li>
          <li>Username: {username}</li>
          <li>Password: **********</li>
          <li>Email: {email}</li>
          <li>Phone Number: {phone}</li>
          {/* click to edit */}
        </ul>
        <h3>Order History</h3>
        {/* {PLUG IN ORDERS HERE} */}
        <hr />
        <Link>
          <button type="button">Order History</button>
        </Link>
        <hr />
        <UpdateUser />
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
  };
};
export default withParams(connect(mapState, mapDispatch)(SingleUser));
