import axios from 'axios';

const initialState = [];

const FETCH_SINGLE_USER = 'FETCH_SINGLE_USER';

const getSingleUser = (user) => {
  return {
    type: FETCH_SINGLE_USER,
    user,
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

const singleUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_USER:
      return action.user;
    default:
      return state;
  }
};

export { singleUserReducer, fetchSingleUser };
