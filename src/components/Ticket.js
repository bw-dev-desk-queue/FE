import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { TextField, Button, InputLabel } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import * as yup from 'yup';
import schema from '../validation/response_spec';

const styles = {
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
    response: {
        display: 'block',
        padding: '1% 0',
        margin: '3% 0',
        borderRadius: '5px',
        border: '1px solid gainsboro',
    },
    form: {
        display: 'flex',
        width: '100%',
        maxWidth: 'none',
        flexDirection: 'row',
        borderTop: '1px solid gainsboro',
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
}

const initialFormValues = {
    message: "",
}

const initialButtonDisabled = true;

const initialFormErrors = {
    message: "",
}

// The responses prop should contain the answers that other users have posted to the ticket
export default function Ticket({ id, title, description, category, wit, responses }) {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [buttonDisabled, setButtonDisabled] = useState(initialButtonDisabled);

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

    const postResponse = () => {
        const response = {
          message: formValues.message,
        }

        // POST WITH AXIOS
        // IF SUCCESS, RESET FORM VALUES TO INITIAL VALUES

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

        // Clear
    }

    // SIDE EFFECTS //
    useEffect(() => {
        // Runs each time there is a change in state on formValues
        schema.isValid(formValues)
            .then(valid => {
                setButtonDisabled(!valid);
            })
    }, [ formValues ]);

    // Check if there are responses to the ticket
    if (!responses || responses.length() <= 0) {
        return (
            <div style={styles.ticketContainer} >
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h3>{id}: {title}</h3>
                </AccordionSummary>
                <AccordionDetails style={styles.accordionDetails} >
                    <div>
                        <p>
                            {description}{wit}
                        </p>
                        <div>
                            <p>
                                <b>WIT:</b> {wit}
                            </p>
                        </div>
                        <div>
                            <p><em>{category}</em></p>
                        </div>
                    </div>
                    <div>
                        <h4 style={{textAlign: 'left'}}>Responses:</h4>
                        <h5>There are no responses</h5>
                        <form onSubmit={onSubmit} style={styles.form}>
                            <TextField onChange={onChange} value={formValues.message} name="message" label="Respond:" type="text" style={styles.textField} />
                            <Button disabled={buttonDisabled} type="submit" variant="contained" color="primary" style={styles.button}>Reply</Button>
                        </form>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
        );
    }

    return (
        <div style={styles.ticketContainer} >
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h3>{id}: {title}</h3>
                </AccordionSummary>
                <AccordionDetails style={styles.accordionDetails} >
                    <div>
                        <p>
                            {description}{wit}
                        </p>
                        <div>
                            <p>
                                <b>WIT:</b> {wit}
                            </p>
                        </div>
                        <div>
                            <p><em>{category}</em></p>
                        </div>
                    </div>
                    <div>
                        <h4 style={{textAlign: 'left'}}>Responses:</h4>
                        {
                            responses.map(resp => {
                                return (
                                    <div key={resp.id} style={styles.response} >
                                        <div>
                                            <span>{resp.username}</span>
                                        </div>
                                        <div>
                                            <p>{resp.message}</p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                        <form onSubmit={onSubmit} style={styles.form}>
                            <TextField onChange={onChange} value={formValues.message} name="message" label="Respond:" type="text" style={styles.textField} />
                            <Button disabled={buttonDisabled} type="submit" variant="contained" color="primary" style={styles.button}>Reply</Button>
                        </form>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}