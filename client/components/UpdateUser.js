import React from 'react';
import { connect } from 'react-redux';
import { editUser } from '../redux/users';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    this.handleAlert = this.handleAlert.bind(this);
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

  handleAlert(event) {
    event.preventDefault();
    return toast('All fields except phone number must be defined.');
  }

  render() {
    const { first_name, last_name, username, phone, password, email } =
      this.state;
    return (
      <section>
        <form
          id="update-user-form"
          onSubmit={(event) => {
            if (
              event.target.first_name.value !== '' &&
              event.target.last_name.value !== '' &&
              event.target.username.value !== '' &&
              event.target.password.value !== '' &&
              event.target.email.value !== ''
            ) {
              this.handleSubmit(event);
            } else {
              this.handleAlert(event);
            }
          }}
        >
          <label>First Name:</label>
          <input
            name="first_name"
            placeholder="first_name"
            value={first_name}
            onChange={this.handleChange}
          ></input>
          <br />
          <label>Last Name:</label>
          <input
            name="last_name"
            placeholder="last_name"
            value={last_name}
            onChange={this.handleChange}
          ></input>
          <br />
          <label>Username:</label>
          <input
            name="username"
            placeholder="username"
            value={username}
            onChange={this.handleChange}
          ></input>
          <br />
          <label>Password:</label>
          <input
            name="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange}
          ></input>
          <br />
          <label>Email:</label>
          <input
            name="email"
            placeholder="email"
            value={email}
            onChange={this.handleChange}
          ></input>
          <br />
          <label>Phone Number:</label>
          <input
            name="phone"
            placeholder="phone"
            value={phone}
            onChange={this.handleChange}
          ></input>
          <br />
          <button type="submit">Update</button>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={2700}
          hideProgressBar={false}
          closeOnClick="true"
        />
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
