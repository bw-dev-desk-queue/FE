import React, { useEffect, useState } from 'react';
import { getAllIssues } from '../actions';
import { connect } from 'react-redux';
import { axiosWithAuth } from '../utils/axiosWithAuth'
import Ticket from './Ticket';
import { useHistory } from 'react-router-dom';
import { Autorenew } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        width: '55%',
        margin: '0 auto',
        border: '1px solid gainsboro',
        borderRadius: '5px'
    },
})


function Tickets(props) {
    const [data, setData] = useState([])
    const classes = useStyles();
    useEffect(() => {
        axiosWithAuth()
            .get('https://dbidwell-dev-desk-queue.herokuapp.com/issues/issues')
            .then(res => {
              setData(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    if (props.fetching === false && props.issues.length > 0) {
        console.log("Tickets.js:" + props.issues)
    }
    return (
        <div >
            <h2>Tickets</h2>
            <div className={classes.container}>
                {data.map(ticket => {
                    console.log(ticket)
                    return (
                        <Ticket key={ticket.id} id={ticket.id} title={ticket.title} category={ticket.category} description={ticket.description} wit={ticket.whatitried} isResolved={ticket.isresolved} canResolve={false} answers={ticket.answers} />
                    )
                })}
            </div>
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