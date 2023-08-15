import authedUser from './authedUser';
import users from './users';
import questions from './questions';

import { loadingBarReducer } from 'react-redux-loading-bar';

export const reducers = {
  authedUser: authedUser,
  users: users,
  questions: questions,
  loadingBar: loadingBarReducer
};
