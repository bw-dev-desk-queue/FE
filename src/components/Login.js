import React from 'react';
import { Container, Paper, TextField, Button } from '@material-ui/core';

const styles = {
  root: {
    width: '50%',
    margin: '0 auto',
    padding: '2% 0',
  },
  inputContainer: {
    margin: '4% 0',
  },
}

export default function Login() {

  // EVENT HANDLERS //
  const onChange = (evt) => {

  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    // POST
  }

  return (
    <Container>

      <div style={styles.root}>
        <h3>We're here to help.</h3>
        <p>Create a help ticket and we'll connect you with a Lambda School Helper.</p>
      </div>

    <Paper style={styles.root} elevation={3}>
      <h3>Login</h3>
      <form onSubmit={onSubmit}>
        <div style={styles.inputContainer}>
          <TextField name="email" label="Email" type="email" autoComplete="current-email" variant="outlined" />
        </div>
        <div style={styles.inputContainer}>
          <TextField name="password" label="Password" type="password" autoComplete="current-password" variant="outlined" />
        </div>
        <Button type="submit" variant="contained" color="primary">Login</Button>
      </form>
    </Paper>

    </Container>
  )
}
