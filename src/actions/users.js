export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_ANSWER = 'ADD_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

export function addQuestionAnswer(info) {
  return {
    type: ADD_ANSWER,
    authedUser: info.authedUser,
    qid: info.qid,
    answer: info.answer
  };
}

export function addUserQuestion(info) {
  return {
    type: ADD_QUESTION,
    authedUser: info.question.author,
    qid: info.question.id
  };
}

export function handleAddUserAnswer({ qid, answer }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(addQuestionAnswer({ authedUser, qid, answer }));
  };
}

export function handleAddUserQuestion({ qid }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(addUserQuestion({ authedUser, qid }));
  };
}
