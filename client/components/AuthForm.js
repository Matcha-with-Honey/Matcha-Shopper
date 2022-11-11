import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../redux/auth';

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' ? (
          <div>
            <input type="text" name="username" placeholder="username" />
            <input type="text" name="password" placeholder="password" />
            <input type="text" name="first_name" placeholder="first name" />
            <input type="text" name="last_name" placeholder="last name" />
            <input type="text" name="email" placeholder="email" />
            <input type="text" name="phone" placeholder="phone number" />
            <button type="submit">{displayName}</button>
            {error && error.response && <div> {error.response.data} </div>}
          </div>
        ) : (
          <div>
            <input type="text" name="username" placeholder="username" />
            <input type="text" name="password" placeholder="password" />
            <button type="submit">{displayName}</button>
            {error && error.response && <div> {error.response.data} </div>}
          </div>
        )}
      </form>
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
      const first_name = evt.target.first_name.value;
      const last_name = evt.target.last_name.value;
      const email = evt.target.email.value;
      const phone = evt.target.phone.value;
      const role = 'member';
      formName === 'signup'
        ? dispatch(
            authenticate(
              { username, password, first_name, last_name, email, role, phone },
              formName
            )
          )
        : dispatch(authenticate({ username, password }, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const SignUp = connect(mapSignup, mapDispatch)(AuthForm);
