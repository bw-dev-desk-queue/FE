import React, { useEffect, useState } from 'react';
import { getAllIssues } from '../actions';
import { connect } from 'react-redux';
import { axiosWithAuth } from '../utils/axiosWithAuth'
import Ticket from './Ticket';
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
                    <Ticket key={ticket.id} id={ticket.id} title={ticket.title} category={ticket.category} description={ticket.description} wit={ticket.whatitried} isResolved={ticket.isresolved} canResolve={false} answers={ticket.answers} />
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