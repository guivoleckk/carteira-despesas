import { LOGIN } from '../type/casesOfType';

export const sendLoginAndPassword = (email) => ({
  type: LOGIN,
  payload: {
    email,
  },
});
