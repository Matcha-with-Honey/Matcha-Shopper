import axios from 'axios';
import { combineReducers } from 'redux';

const FETCH_USERS = 'FETCH_USERS';
const FETCH_SINGLE_USER = 'FETCH_SINGLE_USER';
const CREATE_USER = 'CREATE_USER';
const DELETE_USER = 'DELETE_USER';
const EDIT_USER = 'EDIT_USER';
const TOKEN = 'token';

const getUsers = (users) => {
  return {
    type: FETCH_USERS,
    users,
  };
};

const getSingleUser = (user) => {
  return {
    type: FETCH_SINGLE_USER,
    user,
  };
};

const _makeUser = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};

const _deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

const _editUser = (user) => {
  return {
    type: EDIT_USER,
    user,
  };
};

const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: users } = await axios.get('/api/users', {
          headers: {
            authorization: token,
          },
        });
        dispatch(getUsers(users));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const fetchSingleUser = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.get(`/api/users/${id}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(getSingleUser(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
const makeUser = (user) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post('/api/users', user);
      dispatch(_makeUser(created));
    } catch (error) {
      console.log(error);
    }
  };
};
const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: user } = await axios.delete(`/api/users/${userId}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(_deleteUser(user));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const editUser = (user) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: updated } = await axios.put(
          `/api/users/${user.id}`,
          user
        );
        dispatch(_editUser(updated));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.users;
    case DELETE_USER:
      return state.filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
};

const singleUserReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SINGLE_USER:
      return action.user;
    case CREATE_USER:
      return [...state, action.user];
    case EDIT_USER:
      return action.user;
    default:
      return state;
  }
};
const usersReducer = combineReducers({
  users: allUsersReducer,
  singleUser: singleUserReducer,
});
export {
  usersReducer,
  fetchUsers,
  fetchSingleUser,
  makeUser,
  deleteUser,
  editUser,
};
