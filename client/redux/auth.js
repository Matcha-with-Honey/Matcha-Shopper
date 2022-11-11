import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

//action types
const SET_AUTH = 'SET_AUTH';
const LOG_OUT = 'LOG_OUT';

//action creators
const setAuth = (auth) => {
  return {
    type: SET_AUTH,
    auth,
  };
};

//thunk creators
export const me = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.get('/auth/me', {
          headers: {
            authorization: token,
          },
        });
        return dispatch(setAuth(data));
      }
      return dispatch(setAuth({}));
    } catch (error) {
      console.error(error);
    }
  };
};

export const authenticate = (userInfo, method) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/auth/${method}`, userInfo);
      window.localStorage.setItem(TOKEN, data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export default (state = { auth: { error: '' } }, action) => {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
};
