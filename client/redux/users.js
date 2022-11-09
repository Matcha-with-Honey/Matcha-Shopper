import axios from 'axios';

const initialState = [];

const FETCH_USERS = 'FETCH_USERS';
const CREATE_USER = 'CREATE_USER';
const DELETE_USER = 'DELETE_USER';
const EDIT_USER = 'EDIT_USER';

const getUsers = (users) => {
  return {
    type: FETCH_USERS,
    users,
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
      const { data: users } = await axios.delete(`/api/users/${userId}`);
      dispatch(_deleteUser(users));
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

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.users;
    case CREATE_USER:
      return [...state, action.user];
    case DELETE_USER:
      return state.filter((user) => user.id !== action.user.id);
    case EDIT_USER:
      return state.map((user) =>
        user.id === action.user.id ? action.user : user
      );
    default:
      return state;
  }
};

export { usersReducer, fetchUsers, makeUser, deleteUser, editUser };
