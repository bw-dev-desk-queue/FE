import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    background: 'black',
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
  },
  h1: {
    marginLeft: '3em',
  }
  buttons: {
    fontSize: '2em',
  }
})

function NavBar(props) {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} >
    <h1 className={classes.h1} >DevDeskQueue</h1>
    <div className={classes.buttons}>
    <Link to='/tickets'>All Tickets</Link>
    <Link to='/account'>Account</Link>
    <Link to='/create-ticket'>File Ticket</Link>
    </div>
    </AppBar>
  );

}

export default NavBar
