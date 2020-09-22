import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getWhoIAm } from '../actions';
function Account(props) {
  // props has username, fetching, error,
  // and the big two are userIssues, and userAnswers
  useEffect(() => {
  // grabbing those props again, they _should_ exist
  // but sometimes they *poof* (on refresh)
    props.getWhoIAm();
  }, []) 


  return (
    <p>Account</p>
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