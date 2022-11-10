import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser } from '../redux/users';
import { useParams } from 'react-router-dom';

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
      this.props.fetchSingleUser(this.props.match.params.userId);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { first_name, last_name, email } = this.props.user;
    return (
      <div>
        <h1>Welcome {first_name}</h1>
        <h3>Personal Information</h3>
        <ul>
          <li>First Name: {first_name}</li>
          <li>Last Name: {last_name}</li>
          <li>email: {email}</li>
          <hr />
        </ul>
        <h3>Order History</h3>
        {/* {PLUG IN ORDERS HERE} */}
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
