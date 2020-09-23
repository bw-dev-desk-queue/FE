import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux';

const useStyles = makeStyles({
  root: {
    background: '#000080',
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    marginBottom: '3em',
  },
  h1: {
    marginLeft: '3em',
  },
  buttons: {
    display: 'flex',
    marginTop: '.1em',
  },
  button: {
    color: 'white',
    fontSize: '2em',
    textDecoration: 'none',
    padding: '.5em 1em',
    transition: 'color .2s',
    "&:hover, &:focus": {
      color: 'grey',

    }
  }
})

function NavBar(props) {
  const { id, isStudent, isHelper } = props;
  const classes = useStyles();
  const location = useLocation();
  const [ loginPage, setLoginPage ] = useState(false)
  // hmm.. I need to switch between logout, signup, and login buttons
  // that's to much to use a ternary operator
  // also I need to keep track of whether or not I'm on the login page
  useEffect(() => {
    location.pathname === '/'
      ? setLoginPage(true)
      : setLoginPage(false);
  }, [ location ])

  return (
    <AppBar position='static' className={classes.root} >
    <h1 className={classes.h1} >DevDeskQueue</h1>
    <div className={classes.buttons}>
    { !!isHelper && <Link className={classes.button} to='/tickets'>All Tickets</Link>}
    { !!isStudent && <Link className={classes.button} to='/create-ticket'>File Ticket</Link>}
    { id && <Link className={classes.button} to='/account'>Account</Link> }
    { id && <Link className={classes.button} to='/logout' >Log Out</Link> }
    { !id
    && loginPage
    && <Link className={classes.button} to='/signup' >Signup</Link>
    }
    { !id 
    && !loginPage
    && <Link className={classes.button} to='/' >Log In</Link>
    }
    </div>
    </AppBar>
  );

}
const mapStateToProps = (state) => {
  // I had a whole bunch of logic all over the place on this
  // then I realized I could just define new props here,
  // and just grab exactly what I needed from redux
  // and it would all stay updated because of redux
  // <3 redux
  return {
    id: state.accountInfo.id,
    isStudent: state.accountInfo.roles
      .filter(role => role.role.name === 'STUDENT').length,
    isHelper: state.accountInfo.roles
      .filter(role => role.role.name === 'HELPER').length,
    
  }
}
export default connect(mapStateToProps, {})(NavBar);
