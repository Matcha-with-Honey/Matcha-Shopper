import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers, deleteUser } from '../redux/users';
import { Link } from 'react-router-dom';

export class AllUsers extends React.Component {
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

                <button
                  onClick={() => {
                    this.props.deleteUser(user.id);
                    this.props.fetchUsers();
                  }}
                >
                  Delete
                </button>
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
    deleteUser: (userId) => {
      dispatch(deleteUser(userId));
    },
  };
};
export default connect(mapState, mapDispatch)(AllUsers);
