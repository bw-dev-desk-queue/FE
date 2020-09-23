import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import Account from './components/Account';
import CreateTicket from './components/CreateTicket';
import Tickets from './components/Tickets';
import NavBar from './components/NavBar';
import Logout from './components/Logout';

// I'm thinking '/' for login page
// '/signup' for Signup
// '/student' show all the student's open tickets and allow deleting them
// '/create-ticket'  allow students to create a new ticket

// '/helper' show a list of tickets that person is 'helping' with
// allow to mark as resolved, and to re-assign back to the general queue
// '/tickets' then, can show all tickets that no helper has claimed
// allow helper to click 'help student' button on ticket assigning the ticket to themselves

function App() {
  return (
    <Router>
      <div className='App'>
        <Route path ='/' component={NavBar} />
        <Route exact path='/' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/account' component={Account} />
        <Route path='/create-ticket' component={CreateTicket} />
        <Route path='/tickets' component={Tickets} />
        <Route path='/logout' component={Logout} />
      </div>
    </Router>
  );
}

export default App;
