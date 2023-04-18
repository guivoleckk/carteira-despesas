import { LOGIN } from '../type/casesOfType';

const INITIAL_STATE = {
  email: '',

};

function user(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  switch (type) {
  case LOGIN:
    return {
      ...state,
      email: payload.email,
    };
  default:
    return state;
  }
}
export default user;
