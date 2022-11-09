import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/usersReducer';
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
              <Link to={`/users/${user.id}`} key={user.id}>
                <ul>
                  <li>{`First Name ${user.first_name}`}</li>
                  <li>{`Last Name ${user.last_name}`}</li>
                </ul>
              </Link>
              <button
                type="submit"
                name={user.id}
                onClick={() => this.props.deleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUsers: (id) => {
      dispatch(fetchUsers());
    },
  };
};
export default connect(mapState, mapDispatch)(AllUsers);
