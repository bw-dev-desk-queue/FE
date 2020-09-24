import React, { useEffect, useState } from 'react';
import { getAllIssues } from '../actions';
import { connect } from 'react-redux';
import { axiosWithAuth } from '../utils/axiosWithAuth'
function Tickets(props) {
    const [data, setData] = useState([])
    useEffect(() => {
        axiosWithAuth()
            .get('https://dbidwell-dev-desk-queue.herokuapp.com/issues/issues')
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])
    if (props.fetching === false && props.issues.length > 0) {
        console.log("Tickets.js:" + props.issues)
    }
    return (
        <div >
            <p>Tickets</p>
            {data.map(ticket => {
                return (
                    <div style={{
                        border:"solid 0.25rem gray "
                        , padding:"1rem" 
                        , margin:"2rem" 
                        , backgroundColor: "#EFEFEF"  
                        }} key={ticket.id  }>
                        <h2 >Title: {ticket.title}</h2>
                        <p>Username: {ticket.createduser.username}</p>
                        <p>Description: {ticket.description}</p>
                        <p>Category: {ticket.category}</p>
                        <p>Ticket Status: {ticket.isresolved === true ? 'true' : 'false'}</p>
                    </div>
                )
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
export default connect(mapStateToProps, { getAllIssues })(Tickets);