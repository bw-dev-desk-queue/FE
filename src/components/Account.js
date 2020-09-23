import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getWhoIAm } from '../actions';
import { Container, Paper } from '@material-ui/core';
import Ticket from './Ticket';

const styles = {
  h3 : {
    margin: '0',
    marginTop: '2%',
    paddingBottom: '2%',
    borderBottom: '1px solid gainsboro',
  },
  container: {
    width: '90%',
    margin: '0 auto',
    display: 'flex',
  },
  ticketsContainer: {
    width: '45%',
    margin: '0 2%',
  },
}

// MOCK DATA
// const respones = [{id: 1, username: 'Bob', message: 'Have you tried turning it off & on again?'}, {id: 2, username: 'Jace', message: 'I experienced something similar. Try doing this and then that.'}, {id: 3, username: 'Ryan', message: 'Did you get it fixed? I am having the same issue. I tried this and that, but it still is not working. Maybe it is because of this?'}];

function Account(props) {
  // props has username, fetching, error,
  // and the big two are userIssues, and userAnswers
  useEffect(() => {
  // grabbing those props again, they _should_ exist
  // but sometimes they *poof* (on refresh)
    props.getWhoIAm();
  }, [])

  return (
    <Container>
      <h2>Account</h2>
      <h3>{props.username}</h3>

      <div style={styles.container} >
        <Paper elevation={2} style={styles.ticketsContainer} >
          <h3 style={styles.h3} >Issues</h3>
          {
            props.userIssues.map(issue => {
              return (<Ticket key={issue.id} id={issue.id} title={issue.title} category={issue.category} description={issue.description} wit={issue.whatitried}  />);
            })
          }
        </Paper>
        <Paper elevation={2} style={styles.ticketsContainer} >
          <h3 style={styles.h3} >Answers</h3>
          {
            props.userAnswers.map(ticket => {
              return (<Ticket key={ticket.id} id={ticket.id} title={ticket.title} category={ticket.category} description={ticket.description} wit={ticket.whatitried}  />);
            })
          }
        </Paper>
      </div>

    </Container>
  )
}

function mapStateToProps(state) {
  return {
    username: state.accountInfo.username,
    fetching: state.fetching,
    error: state.error,
    userIssues: state.userIssues,
    userAnswers: state.userAnswers,   
  }
}

export default connect(mapStateToProps, { getWhoIAm })(Account)