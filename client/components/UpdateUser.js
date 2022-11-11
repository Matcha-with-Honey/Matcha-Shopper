import React from 'react';
import { connect } from 'react-redux';
import { editUser } from '../redux/users';

class UpdateUser extends React.Component {
  constructor() {
    super();
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
    this.props.editUser({ ...this.props.user, ...this.state });
  }

  render() {
    return (
      <section>
        <form id="edit-user-form">
          <label>First Name</label>
          <input
            name="first_name"
            placeholder="first_name"
            value={this.state.name}
            onChange={this.handleChange}
          ></input>
          <label>Last Name</label>
          <input
            name="last_name"
            placeholder="last_name"
            value={this.state.name}
            onChange={this.handleChange}
          ></input>
          <label>Username</label>
          <input
            name="username"
            placeholder="username"
            value={this.state.name}
            onChange={this.handleChange}
          ></input>
          <label>Password</label>
          <input
            name="password"
            placeholder="password"
            value={this.state.name}
            onChange={this.handleChange}
          ></input>
          <label>Email</label>
          <input
            name="email"
            placeholder="email"
            value={this.state.name}
            onChange={this.handleChange}
          ></input>
        </form>
      </section>
    );
  }
}

export { UpdateUser };
