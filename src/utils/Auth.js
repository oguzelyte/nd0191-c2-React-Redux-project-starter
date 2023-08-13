import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Auth = (props) => {
  const { children, authedUser } = props;

  return authedUser ? children : <Navigate to="/login" />;
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser: authedUser
});

export default connect(mapStateToProps)(Auth);
