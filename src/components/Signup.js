import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Paper, TextField, MenuItem, Button, Select, InputLabel } from '@material-ui/core';
import { axiosSignup } from '../utils/axiosWithAuth';
import * as yup from 'yup';
import schema from '../validation/signup_spec';

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
  password: "",
  role: ""
}

const initialFormErrors = {
  username: "",
  password: "",
  role: ""
}

const intialButtonDisabled = true;

const initialAccessToken = "";


export default function Signup() {
  const history = useHistory();
  // SLICES OF STATE //
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [buttonDisabled, setButtonDisabled] = useState(intialButtonDisabled);
  const [accessToken, setAccessToken] = useState(initialAccessToken);

  // HELPERS //
  const postNewUser = () => {
    const newUser = {
      username: formValues.username,
      password: formValues.password,
      roles: formValues.role.split(' and ') // Could be ["student"], ["helper"], or ["student", "helper"]
    }
      axiosSignup().post(
        '/createnewuser', newUser
      )
      .then((res) => {
        console.log(res)
        localStorage.setItem('token', res.data["access_token"]);
        history.push('/account');
      })
      .catch((err) => console.log(err))
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

    // SET STATE
    setFormValues({ ...formValues, [name]: value});
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    // POST
    postNewUser();
  }

  // SIDE EFFECTS //
  useEffect(() => {
    // Runs each time there is a change of state on formValues
    schema.isValid(formValues)
      .then(valid => {
        setButtonDisabled(!valid);
      })
  }, [ formValues ]);

  useEffect(() => {

  }, [ accessToken ])

  return (
    <Container>
      <div style={styles.root}>
        <h2>DevDeskQueue</h2>
        <p>We're here to help.</p>
      </div>
      <Paper style={styles.root} elevation={3}>
        <h2 style={styles.h2}>Sign Up</h2>
        <form onSubmit={onSubmit}>
          <div style={styles.inputContainer}>
            <TextField onChange={onChange} value={formValues.username} name="username" label="username" type="username" autoComplete="current-username" variant="outlined" required error={formErrors.username === "" ? false : true} helperText={formErrors.username} />
          </div>
          <div style={styles.inputContainer}>
            <TextField onChange={onChange} value={formValues.password} name="password" label="Password" type="password" autoComplete="current-password" variant="outlined" required error={formErrors.password === "" ? false : true} helperText={formErrors.password} />
          </div>
          <div style={styles.inputContainer}>
            <InputLabel>Role:</InputLabel>
            <Select onChange={onChange} name={'role'} value={formValues.role} label="Role" >
              <MenuItem value={'student'}>Student</MenuItem>
              <MenuItem value={'helper'}>Helper</MenuItem>
              <MenuItem value={'student and helper'}>Student & Helper</MenuItem>
            </Select>
          </div>
          <Button disabled={buttonDisabled} type="submit" variant="contained" color="primary">Submit</Button>
        </form>
      </Paper>
    </Container>
  )
}
