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
      phone: '',
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
    const { first_name, last_name, username, phone, password, email } =
      this.props.singleUser;
    if (prevProps.singleUser.id !== this.props.singleUser.id) {
      this.setState({
        first_name,
        last_name,
        username,
        password,
        email,
        phone,
      });
    }
  }

  render() {
    const { first_name, last_name, username, phone, password, email } =
      this.state;
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <label>First Name</label>
          <input
            name="first_name"
            value={first_name}
            onChange={this.handleChange}
          ></input>
          <label>Last Name</label>
          <input
            name="last_name"
            placeholder="last_name"
            value={last_name}
            onChange={this.handleChange}
          ></input>
          <label>Username</label>
          <input
            name="username"
            placeholder="username"
            value={username}
            onChange={this.handleChange}
          ></input>
          <label>Password</label>
          <input
            name="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange}
          ></input>
          <label>Email</label>
          <input
            name="email"
            placeholder="email"
            value={email}
            onChange={this.handleChange}
          ></input>
          <label>Phone Number</label>
          <input
            name="phone"
            placeholder="phone"
            value={phone}
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
