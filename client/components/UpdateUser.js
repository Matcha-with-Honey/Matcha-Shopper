import React from 'react';
import { connect } from 'react-redux';
import { editUser } from '../redux/users';

class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.editUser({ ...this.props.singleUser, ...this.state });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.singleUser.id !== this.props.singleUser.id) {
      this.setState({
        first_name: this.props.singleUser.first_name,
        last_name: this.props.singleUser.last_name,
        username: this.props.singleUser.username,
        password: this.props.singleUser.password,
        email: this.props.singleUser.email,
      });
    }
  }

  render() {
    console.log(this.props);
    console.log(this.state);

    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <label>First Name</label>
          <input
            name="first_name"
            value={this.state.first_name}
            onChange={this.handleChange}
          ></input>
          <label>Last Name</label>
          <input
            name="last_name"
            placeholder="last_name"
            value={this.state.last_name}
            onChange={this.handleChange}
          ></input>
          <label>Username</label>
          <input
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
          ></input>
          <label>Password</label>
          <input
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          ></input>
          <label>Email</label>
          <input
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}
          ></input>
          <button type="submit">Update</button>
        </form>
      </section>
    );
  }
}

const mapState = (state) => ({
  singleUser: state.usersReducer.singleUser,
});

const mapDispatch = (dispatch) => {
  return {
    editUser: (userId, user) => {
      dispatch(editUser(userId, user));
    },
  };
};

export default connect(mapState, mapDispatch)(UpdateUser);
