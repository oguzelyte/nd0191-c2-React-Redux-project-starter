import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeAuthedUser } from '../actions/authedUser';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(removeAuthedUser());
    navigate('/login'); // Redirect to the home page or login page
  }, [dispatch, navigate]);

  return null;
};

export default Logout;
