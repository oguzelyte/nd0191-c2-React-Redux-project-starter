import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';

describe('async functions', () => {
  // 1. _saveQuestion - verifies it returns question with formatted fields
  it('_saveQuestion will return saved question with expected fields', async () => {
    const questionVars = { optionOneText: 'first option', optionTwoText: 'second option', author: 'tylermcginnis' };
    const formattedQuestion = await _saveQuestion(questionVars);

    expect(formattedQuestion.id).toBeDefined();
    expect(formattedQuestion.timestamp).toBeDefined();

    expect(formattedQuestion.optionOne.text).toEqual(questionVars.optionOneText);
    expect(formattedQuestion.optionOne.votes).toEqual([]);

    expect(formattedQuestion.optionTwo.text).toEqual(questionVars.optionTwoText);
    expect(formattedQuestion.optionTwo.votes).toEqual([]);
  });

  // 2. _saveQuestion - verifies it rejects if incorrect data is passed
  it('_saveQuestion will throw an error if incorrect data is passed', async () => {
    expect.assertions(1);
    const questionVars = { optionOneText: 'first option', optionTwoText: 'second option' };
    await expect(_saveQuestion(questionVars)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
  });

  // 3. _saveQuestionAnswer - verifies it returns if correct data is passed
  it('_saveQuestionAnswer will save question answer if correct data is passed', async () => {
    const answerVars = { authedUser: 'sarahedo', qid: 'xj352vofupe1dqz9emx13r', answer: 'optionOne' };
    await expect(_saveQuestionAnswer(answerVars)).resolves.toEqual(true);
    await Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => {
      // the answer is added to user array
      expect(Object.keys(users.sarahedo.answers).includes(answerVars.qid)).toBe(true);
      expect(Object.values(users.sarahedo.answers).includes(answerVars.answer)).toBe(true);

      // the vote is added to question array
      expect(questions.xj352vofupe1dqz9emx13r.optionOne.votes.includes(answerVars.authedUser)).toBe(true);
    });
  });

  // 4. _saveQuestionAnswer - verifies it rejects if incorrect data is passed
  it('_saveQuestionAnswer will throw an error if incorrect data is passed', async () => {
    const answerVars = { qid: '8xf0y6ziyjabvozdd253nd', answer: 'optionOne' };
    await expect(_saveQuestionAnswer(answerVars)).rejects.toBe('Please provide authedUser, qid, and answer');
  });
});
