import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/users';
import { Link } from 'react-router-dom';

export class AllUsers extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    try {
      this.props.fetchUsers();
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { users } = this.props;
    return (
      <div className="all-users">
        <h1>User List</h1>
        {users.map((user) => {
          return (
            <div className="user" key={user.id}>
              <div>
                <p>{`First Name: ${user.first_name}`}</p>
                <p>{`Last Name: ${user.last_name}`}</p>
                <p>{`email: ${user.email}`}</p>
                <Link to={`/users/${user.id}`} key={user.id}>
                  detail
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.usersReducer.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers());
    },
  };
};
export default connect(mapState, mapDispatch)(AllUsers);
