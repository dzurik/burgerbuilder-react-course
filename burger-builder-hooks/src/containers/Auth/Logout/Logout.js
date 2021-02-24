import { useEffect, useCallback } from 'react';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Logout = (props) => {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => dispatch(actions.logout()), [dispatch]);

  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to="/" />;
};

export default Logout;
