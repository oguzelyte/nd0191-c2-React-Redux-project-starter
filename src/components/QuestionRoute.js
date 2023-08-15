import { Navigate, useParams } from 'react-router-dom';
import Question from './Question';
import NotFound from './NotFound';
import { connect } from 'react-redux';

function QuestionRoute(props) {
  const { id } = useParams();

  if (!props.authedUser) {
    return <Navigate to="/login" state={{ from: `/questions/${id}` }} />;
  }

  if (Object.keys(props.questions).includes(id)) {
    return <Question authedUserData={props.authedUserData} />;
  }

  return <NotFound state={{ from: `/questions/${id}` }} />;
}

const mapStateToProps = ({ questions, authedUser }) => ({
  questions,
  authedUser
});

export default connect(mapStateToProps)(QuestionRoute);
