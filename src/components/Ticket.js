import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import schema from '../validation/response_spec';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import { connect } from 'react-redux';
import { postAnswer, getWhoIAm } from '../actions';

const useStyles = makeStyles({
    ticketContainer: {
      width: '95%',
      margin: '0 auto',
      marginTop: '1%',
      borderBottom: '1px solid gainsboro',
      padding: '2% 1%',
    },
    accordionDetails: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '1%',
    },
    ticketContent : {
        borderBottom: '1px solid gainsboro',
    },
    response: {
        display: 'block',
        padding: '2% 0',
        margin: '3% 0',
        borderRadius: '3px',
        border: '1px solid gainsboro',
    },
    form: {
        display: 'flex',
        width: '100%',
        maxWidth: 'none',
        flexDirection: 'row',
        borderTop: '1px solid gainsboro',
        borderRadius: '2px',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textField: {
        width: '80%',
        paddingBottom: '5%',
    },
    button: {
        width: '10%',
    },
    resolveButton: {
        marginBottom: '2%',
    },
    resolvedText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '5%',
    }
})

const initialFormValues = {
    message: "",
}

const initialButtonDisabled = true;

const initialFormErrors = {
    message: "",
}

function Ticket({ id, title, description, category, wit, answers, isResolved, postAnswer, getWhoIAm }) {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [buttonDisabled, setButtonDisabled] = useState(initialButtonDisabled);
    const [issueAnswers, setIssueAnswers] = useState(answers);

    const classes = useStyles();

    // HELPERS //
    const validate = (name, value) => {
        yup
          .reach(schema, name)
            .validate(value)
              .then(res => {
                setFormErrors({ ...formErrors, [name]: "" });
              })
              .catch(err => {
                setFormErrors({ ...formErrors, [name]: err.errors[0] });
              })
    }

    // EVENT HANDLERS //
    const onChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;

        // VALIDATE
        validate(name, value);

        // SET TO STATE
        setFormValues({ ...formValues, [name]: value });
    }

    const onSubmit = (evt) => {
        evt.preventDefault();
        // POST
        const answer = {
            id: id,
            answer: formValues.message
        }
        postAnswer(answer.id, answer.answer);
        // ADD TO STATE
        if (!issueAnswers) {
            setIssueAnswers( [answer] );
        } else {
            setIssueAnswers(...issueAnswers, [answer]);
        }
        // CLEAR FORM
        setFormValues(initialFormValues);
    }

    const onResolveClick = () => {
      // POST RESOLVE FOR TICKET
      // lets try not using a new redux action
      axiosWithAuth().get(`/issues/resolve/${id}?resolved=true`)
      .then(res => {
        console.log(res);
        getWhoIAm();
      })
      .catch(err => {
        console.log(err);
      })
    }

    // SIDE EFFECTS //
    useEffect(() => {
        // Runs each time there is a change in state on formValues
        schema.isValid(formValues)
            .then(valid => {
                setButtonDisabled(!valid);
            })
    }, [ formValues ]);

    useEffect(() => {
        console.log("Here are the responses: ", issueAnswers);
    }, [issueAnswers])

    return (
        <div className={classes.ticketContainer} >
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} style={isResolved ? {backgroundColor: '#64f38c', color: 'white'} :  {backgroundColor: '#e73827', color: 'white'}} >
                    <div>
                        <h3>{title}</h3>
                    </div>
                    <div className={classes.resolvedText}>
                        {isResolved ? <span>Resolved</span> : <span>Not Resolved</span>}
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails} >
                    <div className={classes.ticketContent} >
                        <p>
                            {description}{wit}
                        </p>
                        <div>
                            <p>
                                <b>WIT:</b> {wit}
                            </p>
                        </div>
                        <div>
                            <p>
                                <b>Category:</b> <em>{category}</em>
                            </p>
                        </div>
                    </div>
                    <div>
                        <h4 style={{textAlign: 'left'}}>Responses:</h4>
                        {(issueAnswers.length > 0) &&
                            issueAnswers.map(resp => {
                                return (
                                    <div key={resp.id} className={classes.response} >
                                        <div>
                                            <p>{resp.answer}</p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                        {(!issueAnswers) &&
                            <h5>There are no responses</h5>
                        }
                        <form onSubmit={onSubmit} className={classes.form}>
                            <TextField onChange={onChange} value={formValues.message} name="message" label="Respond:" type="text" className={classes.textField} />
                            <Button disabled={buttonDisabled} type="submit" variant="contained" color="primary" className={classes.button}>Reply</Button>
                        </form>
                    </div>
                    {!isResolved &&
                        <div>
                            <Button onClick={onResolveClick} variant="contained" color="primary" className={classes.button, classes.resolveButton}>Resolve</Button>
                        </div>
                    }
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default connect(() => ({}), { postAnswer, getWhoIAm })(Ticket)
