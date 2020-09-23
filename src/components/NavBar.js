import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

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
  const classes = useStyles();
  return (
    <AppBar position='static' className={classes.root} >
    <h1 className={classes.h1} >DevDeskQueue</h1>
    <div className={classes.buttons}>
    <Link className={classes.button} to='/tickets'>All Tickets</Link>
    <Link className={classes.button} to='/account'>Account</Link>
    <Link className={classes.button} to='/create-ticket'>File Ticket</Link>
    <Link className={classes.button} to='/logout' >LogOut</Link>
    </div>
    </AppBar>
  );

}

export default NavBar
