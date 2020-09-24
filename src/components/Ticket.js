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
        paddingTop: '2%',
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
        width: '20%',
        marginBottom: '2%',
    },
    miscDetails: {
        textAlign: 'left',
        width: '95%',
        marginTop: '5%',
        paddingTop: '1%',
        paddingBottom: '4%',
    }
})

const initialFormValues = {
    message: "",
}

const initialButtonDisabled = true;

const initialFormErrors = {
    message: "",
}

function Ticket({ id, title, description, category, wit, answers, isResolved, canResolve, postAnswer, getWhoIAm }) {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [buttonDisabled, setButtonDisabled] = useState(initialButtonDisabled);

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

    return (
        <div className={classes.ticketContainer} >
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} style={isResolved ? {backgroundColor: '#64f38c', color: 'white'} :  {backgroundColor: '#e73827', color: 'white'}} >
                    <div>
                        <h3>{title}</h3>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails} >
                    <div className={classes.ticketContent} >
                        <div>
                            <span><b>Description: </b></span>
                            <p>
                                {description}
                            </p>
                        </div>
                        <div className={classes.miscDetails}>
                            <div>
                                <p>
                                    <b>What I've Tried:</b> {wit}
                                </p>
                            </div>
                            <div>
                                <p>
                                    <b>Category:</b> <em>{category}</em>
                                </p>
                            </div>
                            <div>
                                <b>Resolved: </b> {isResolved ? <span>YES</span> : <span>NO</span>}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 style={{textAlign: 'left'}}>Responses:</h4>
                        {(answers.length > 0) &&
                            answers.map(resp => {
                                return (
                                    <div key={resp.id} className={classes.response} >
                                        <div>
                                            <p>{resp.answer}</p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                        {(!answers || answers.length <= 0) &&
                            <h5>There are no responses</h5>
                        }
                        <form onSubmit={onSubmit} className={classes.form}>
                            <TextField onChange={onChange} value={formValues.message} name="message" label="Respond:" type="text" className={classes.textField} />
                            <Button disabled={buttonDisabled} type="submit" variant="contained" color="primary" className={classes.button}>Reply</Button>
                        </form>
                    </div>
                    {(!isResolved && canResolve) &&
                        <div>
                            <Button onClick={onResolveClick} variant="contained" color="primary" className={classes.resolveButton}>Resolve</Button>
                        </div>
                    }
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default connect(() => ({}), { postAnswer, getWhoIAm })(Ticket)
