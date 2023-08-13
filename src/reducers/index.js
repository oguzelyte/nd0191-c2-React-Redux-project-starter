import authedUser from './authedUser';
import users from './users';
import { loadingBarReducer } from 'react-redux-loading-bar';

export const reducers = {
  authedUser: authedUser,
  users: users,
  loadingBar: loadingBarReducer
};
