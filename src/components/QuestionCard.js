import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatQuestion } from '../utils/helpers';

const QuestionCard = (props) => {
  const { id, author, date } = props.question;

  if (id === null) {
    return <p> This tweet doesn't exist.</p>;
  }
  <Link className="question-card" to={`/questions/${id}`}></Link>;

  return (
    <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/questions/${id}`}>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{author}</h5>
      </Link>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{date}</p>
      <Link
        className="question-card inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        to={`/questions/${id}`}
      >
        Show
        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
      </Link>
    </div>
  );
};

function mapStateToProps({ questions }, { id }) {
  const question = questions[id];

  return {
    question: question ? formatQuestion(question) : null
  };
}

export default connect(mapStateToProps)(QuestionCard);
