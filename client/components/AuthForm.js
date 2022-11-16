import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authenticate } from '../redux/auth';

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div id="log-in-form-div">
      <form id="log-in-sign-up-form" onSubmit={handleSubmit} name={name}>
        {name === 'signup' ? (
          <div>
            <br></br>
            <input type="text" name="username" placeholder="username" />
            <br></br>
            <input type="text" name="password" placeholder="password" />
            <br></br>
            <input type="text" name="first_name" placeholder="first name" />
            <br></br>
            <input type="text" name="last_name" placeholder="last name" />
            <br></br>
            <input type="text" name="email" placeholder="email" />
            <br></br>
            <input type="text" name="phone" placeholder="phone number" />
            <br></br>
            <button type="submit">{displayName}</button>
          </div>
        ) : (
          <div>
            <input type="text" name="username" placeholder="username" />
            <br></br>
            <input type="text" name="password" placeholder="password" />
            <br></br>
            <button type="submit">{displayName}</button>
            {error && error.response && <div> {error.response.data} </div>}
          </div>
        )}
      </form>
      <ToastContainer
        position="top-center"
        autoClose={2700}
        hideProgressBar={true}
        closeOnClick="true"
      />
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.authReducer.error ? state.authReducer.error : '',
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.authReducer.error ? state.authReducer.error : '',
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      if (formName === 'signup') {
        const first_name = evt.target.first_name.value;
        const last_name = evt.target.last_name.value;
        const email = evt.target.email.value;
        const phone = evt.target.phone.value;
        const role = 'member';
        console.log(username);
        if (
          username === '' ||
          password === '' ||
          first_name === '' ||
          last_name === '' ||
          email === ''
        ) {
          return toast('All fields except phone number must be defined.');
        }
        dispatch(
          authenticate(
            { username, password, first_name, last_name, email, role, phone },
            formName
          )
        );
      }
      dispatch(authenticate({ username, password }, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const SignUp = connect(mapSignup, mapDispatch)(AuthForm);
