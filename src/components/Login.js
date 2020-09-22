import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button } from '@material-ui/core';
import * as yup from 'yup';
import schema from '../validation/login_spec';
import { axiosWithSecret } from '../utils/axiosWithAuth';

import { connect } from 'react-redux';
import { getWhoIAm } from '../actions';

// INLINE STYLES //
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

// INITIAL VALUES //
const initialFormValues = {
  username: "",
  password: ""
}

const initialFormErrors = {
  username: "",
  password: ""
}

const intialButtonDisabled = true;

const initialAccessToken = "";

function Login(props) {
  // Slices of state
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [buttonDisabled, setButtonDisabled] = useState(intialButtonDisabled);
  const [accessToken, setAccessToken] = useState(initialAccessToken);

  /// TAKING TOKEN AND MOVING ON ///
  const history = useHistory();
  useEffect(() => {
    console.log(accessToken);
    if (accessToken.length) {
      localStorage.setItem('token', accessToken);
      props.getWhoIAm(); 
      history.push('/account')
    }
   } , [accessToken])
  
  //////////////////////////////////



  // HELPERS //
  const postUser = () => {
    const user = {
      username: formValues.username,
      password: formValues.password
    }

    // Mock post until endpoint is set up
    axiosWithSecret().post('/login', `grant_type=password&username=${user.username}&password=${user.password}`)
      .then(res => {
        setAccessToken(res.data["access_token"]);
      })
      .catch(err => {
        console.log(err);
      });
  }

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

    // Set values to state
    setFormValues({ ...formValues, [name]: value});
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    postUser();
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
    // Listens for a change of state for the access token
  }, [ accessToken ]);

  return (
    <Container>
      <div style={styles.root}>
        <h2>DevDeskQueue</h2>
        <p>We're here to help.</p>
      </div>
      <Paper style={styles.root} elevation={3}>
        <h2 style={styles.h2}>Login</h2>
        <form onSubmit={onSubmit}>
          <div style={styles.inputContainer}>
            <TextField onChange={onChange} value={formValues.username} name="username" label="username" type="username" autoComplete="current-username" variant="outlined" required error={formErrors.username === "" ? false : true} helperText={formErrors.username} />
          </div>
          <div style={styles.inputContainer}>
            <TextField onChange={onChange} value={formValues.password} name="password" label="Password" type="password" autoComplete="current-password" variant="outlined" required error={formErrors.password === "" ? false : true} helperText={formErrors.password} />
          </div>
          <Button disabled={buttonDisabled} type="submit" variant="contained" color="primary">Login</Button>
        </form>
      </Paper>
    </Container>
  );
}

function mapStateToProps() {
  return {};
};

export default connect(mapStateToProps, { getWhoIAm })(Login);