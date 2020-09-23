import React, { useEffect} from 'react';
import { getAllIssues } from '../actions';
import { connect } from 'react-redux';
function Tickets(props) {
  useEffect(() => props.getAllIssues(), [])
  // this will load all issues into 'props.issues'
  // there is also a boolean 'props.fetching'
  // that is true if currently requesting issues
  // and false if not.
  if (props.fetching === false && props.issues.length > 0) {
    console.log("Tickets.js:" + props.issues)
  }
  return (
    <div >
       <p>Tickets</p>
      {props.tickets.map(ticket => {
        return (<div key={ticket.id}>
          <h2>{ticket.name}</h2>
          <p>{ticket.description}</p>
          <p>{ticket.wit}</p>
          <p>{ticket.category}</p>
        </div>)
      })}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    issues: state.issues,
    accountInfo: state.accountInfo,
    fetching: state.fetching,
  }
}
export default connect(mapStateToProps, { getAllIssues})(Tickets);