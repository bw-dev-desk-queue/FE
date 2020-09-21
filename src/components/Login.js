import React from 'react';
import { useState } from 'react';
import { Container, Paper, TextField, Button } from '@material-ui/core';

// Using for mock posts requests
import axios from 'axios';

const styles = {
  root: {
    width: '50%',
    margin: '0 auto',
    padding: '2% 0',
  },
  inputContainer: {
    margin: '4% 0',
  },
  h2: {
    margin: '0',
  },
}

// Initial Values
const initialFormValues = {
  email: "",
  password: ""
}

const initialFormErrors = {
  email: "",
  password: ""
}

export default function Login() {
  // Slices of state
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  // HELPERS //

  const postUser = () => {
    const user = {
      email: formValues.email,
      password: formValues.password
    }

    // Mock post until endpoint is set up
    axios.post('https://reqres.in/api/login', user)
      .then(res => {
        console.log(res);

      })
      .catch(err => {
        console.log(err);
      });
  }

  // EVENT HANDLERS //
  const onChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    // VALIDATE

    // Set values to state
    setFormValues({ ...formValues, [name]: value});
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    postUser();
  }

  return (
    <Container>
      <div style={styles.root}>
        <h2>We're here to help.</h2>
        <p>Create a help ticket and we'll connect you with a Lambda School Helper.</p>
      </div>
      <Paper style={styles.root} elevation={3}>
        <h2 style={styles.h2}>Login</h2>
        <form onSubmit={onSubmit}>
          <div style={styles.inputContainer}>
            <TextField onChange={onChange} value={formValues.email} name="email" label="Email" type="email" autoComplete="current-email" variant="outlined" required />
          </div>
          <div style={styles.inputContainer}>
            <TextField onChange={onChange} value={formValues.password} name="password" label="Password" type="password" autoComplete="current-password" variant="outlined" required />
          </div>
          <Button type="submit" variant="contained" color="primary">Login</Button>
        </form>
      </Paper>
    </Container>
  );
}
