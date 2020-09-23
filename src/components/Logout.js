import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Logout() {
  const history = useHistory();
  localStorage.setItem('token', '');
  history.push('/');
  return ( <p>Logging out...</p> );
}