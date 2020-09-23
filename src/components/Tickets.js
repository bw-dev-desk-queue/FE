import React, { useEffect} from 'react';
import { getAllIssues } from '../actions';
import { connect } from 'react-redux';

function Tickets(props) {
  return (
    <div >
      {props.tickets.map(ticket => (
        <div key={ticket.id}>
          <h2>{ticket.name}</h2>
          <p>{ticket.description}</p>
          <p>{ticket.wit}</p>
          <p>{ticket.category}</p>
        </div>
      ))}
    </div>
  );
};
  // this will load all issues into 'props.issues'
  useEffect(() => props.getAllIssues(), [])
  // there is also a boolean 'props.fetching'
  // that is true if currently requesting issues
  // and false if not.
  
  if (props.fetching === false && props.issues.length > 0) {
    console.log("Tickets.js:" + props.issues)
  }
  
 


const mapStateToProps = (state) => {
  return {
    issues: state.issues,
    accountInfo: state.accountInfo,
    fetching: state.fetching,
  }
}

export default connect(mapStateToProps, { getAllIssues})(Tickets);