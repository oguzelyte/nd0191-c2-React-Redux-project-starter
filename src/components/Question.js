import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { handleSaveQuestionAnswer } from '../actions/questions';
import { handleAddUserAnswer } from '../actions/users';

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const Question = (props) => {
  const { authedUser, authedUserData, question, questionAuthor, usersCount, dispatch } = props;

  const answeredPoll = Object.keys(authedUserData.answers).includes(props.question.id);

  const handleVote = (option) => {
    dispatch(
      handleSaveQuestionAnswer({
        qid: question.id,
        answer: option
      })
    ).then(() => {
      dispatch(
        handleAddUserAnswer({
          qid: question.id,
          answer: option
        })
      );
    });
  };

  return answeredPoll ? (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <h1 className="pt-4 pb-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Poll by {question.author}</h1>
      <img className="m-auto h-48 w-96" src={questionAuthor.avatarURL} alt="question author" />
      <div className="options grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pt-4">
        <div className="gap-4 relative text-center flex flex-col option-1 p-6 pt-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {question.optionOne.votes.includes(authedUser) && (
            <span className="absolute top-3 left-3 bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              You voted for
            </span>
          )}
          <span className="first-letter:capitalize">{question.optionOne.text}</span>
          <span>{question.optionOne.votes.length} people voted in total</span>
          <span>
            {Math.round((parseInt(question.optionOne.votes.length) / parseInt(usersCount)) * 100)} percentage of people voted in total
          </span>
        </div>
        <div className="gap-4 relative text-center option-2 flex flex-col p-6 pt-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {question.optionTwo.votes.includes(authedUser) && (
            <span className="bg-green-100 absolute top-3 left-3 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              You voted for
            </span>
          )}
          <span className="first-letter:capitalize">{question.optionTwo.text}</span>
          <span>{question.optionTwo.votes.length} people voted in total</span>
          <span>{Math.round((question.optionTwo.votes.length / usersCount) * 100)} percentage of people voted in total</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <h1 className="pt-4 pb-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Poll by {question.author}</h1>
      <img className="m-auto h-48 w-96" src={questionAuthor.avatarURL} alt="question author" />
      <h2 className="pt-4 pb-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Would you rather?</h2>
      <div className="options grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="gap-4 text-center flex flex-col option-1 p-6 pt-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <span className="first-letter:capitalize">{question.optionOne.text}</span>
          <button
            className="text-white w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-30 disabled:pointer-events-none
          focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleVote('optionOne')}
          >
            Click to vote
          </button>
        </div>
        <div className="gap-4 text-center option-2 flex flex-col p-6 pt-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <span className="first-letter:capitalize">{question.optionTwo.text}</span>
          <button
            className="text-white w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-30 disabled:pointer-events-none
          focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleVote('optionTwo')}
          >
            Click to vote
          </button>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props.router.params;
  const question = questions[id];
  const questionAuthor = question ? Object.values(users).find((user) => user.id === question.author) : null;

  return {
    question: question ? question : null,
    questionAuthor,
    usersCount: Object.keys(users).length,
    authedUser
  };
}
export default withRouter(connect(mapStateToProps)(Question));
