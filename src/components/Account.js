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
          <h3 style={styles.h3} >My Issues</h3>
          {
            props.userIssues.map(ticket => {
              return (<Ticket key={ticket.id} id={ticket.id} title={ticket.title} category={ticket.category} description={ticket.description} wit={ticket.whatitried} isResolved={ticket.isresolved} canResolve={true} answers={ticket.answers} />);
            })
          }
        </Paper>
        <Paper elevation={2} style={styles.ticketsContainer} >
          <h3 style={styles.h3} >My Answers</h3>
          {
            props.userAnswers.map(ticket => {
              return (<Ticket key={ticket.id} id={ticket.id} title={ticket.issue.title} category={ticket.issue.category} description={ticket.issue.description} wit={ticket.issue.whatitried} isResolved={ticket.issue.isresolved} canResolve={false} answers={[{id: ticket.id, answer: ticket.answer}]} />);
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