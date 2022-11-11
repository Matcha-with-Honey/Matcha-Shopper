import axios from 'axios';
import { combineReducers } from 'redux';

const FETCH_USERS = 'FETCH_USERS';
const FETCH_SINGLE_USER = 'FETCH_SINGLE_USER';
const CREATE_USER = 'CREATE_USER';
const DELETE_USER = 'DELETE_USER';
const EDIT_USER = 'EDIT_USER';

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
      const { data: users } = await axios.get('/api/users');
      dispatch(getUsers(users));
    } catch (error) {
      console.log(error);
    }
  };
};

const fetchSingleUser = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      dispatch(getSingleUser(data));
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
      const { data: user } = await axios.delete(`/api/users/${userId}`);
      dispatch(_deleteUser(user));
      dispatch(fetchUsers());
    } catch (error) {
      console.log(error);
    }
  };
};

const editUser = (user) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(`/api/users/${user.id}`, user);
      dispatch(_editUser(updated));
    } catch (error) {
      console.log(error);
    }
  };
};

const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.users;
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
    case DELETE_USER:
      return action.deleteUser;
    case EDIT_USER:
      return state.map((user) =>
        user.id === action.user.id ? action.user : user
      );
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
