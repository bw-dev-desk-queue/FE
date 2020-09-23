import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../actions';

function Logout(props) {
  const history = useHistory();
  useEffect(() => {
    localStorage.setItem('token', '');
    props.logout()
    history.push('/');
  }, [])

  return ( <p>Logging out...</p> );
}


export default connect(() => ({}), { logout } )(Logout)