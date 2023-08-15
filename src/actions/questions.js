import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { saveQuestionAnswer, saveQuestion } from '../utils/api';
import { addUserQuestion } from './users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function addQuestionAnswer(info) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser: info.authedUser,
    qid: info.qid,
    answer: info.answer
  };
}

export function addNewQuestion(question) {
  return {
    type: ADD_NEW_QUESTION,
    question
  };
}

export function handleSaveQuestionAnswer({ qid, answer }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    return saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => dispatch(addQuestionAnswer({ authedUser, qid, answer })))
      .then(() => dispatch(hideLoading()));
  };
}

export function handleAddQuestion(question) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    question.author = authedUser;
    dispatch(showLoading());

    return saveQuestion(question)
      .then((question) => dispatch(addNewQuestion(question)))
      .then((question) => dispatch(addUserQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}
