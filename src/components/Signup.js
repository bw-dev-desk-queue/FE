import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Paper, TextField, MenuItem, Button, Select, InputLabel } from '@material-ui/core';
import { axiosSignup } from '../utils/axiosWithAuth';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import schema from '../validation/signup_spec';

// INLINE STYLES //
const useStyles = makeStyles({
  root: {
    width: '50%',
    margin: '0 auto',
    padding: '2% 0',
  },
  inputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-around',
  },
  h2: {
    margin: '0',
  },
  input: {
    margin: '4% 0',
  },
  button: {
    width: '17%',
    marginTop: '2%',
  }
})

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
  const [networkError, setNetworkError] = useState('');

  const classes = useStyles();

  // HELPERS //
  const postNewUser = () => {
    const newUser = {
      username: formValues.username,
      password: formValues.password,
      roles: formValues.role.split(' and ') // Could be ["student"], ["helper"], or ["student", "helper"]
    }
      axiosSignup().post('/createnewuser', newUser)
        .then((res) => {
          localStorage.setItem('token', res.data["access_token"]);
          history.push('/account');
        })
      .catch((err) => {
        setNetworkError(err.response.data.detail);
      })
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
    console.log(name);
    if ( name === 'username' ) {
      setNetworkError('');
    }

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
      <Paper className={classes.root} elevation={3}>
        <h2 className={classes.h2}>Sign Up</h2>
        <form onSubmit={onSubmit}>
          <div className={classes.inputsContainer}>
            <TextField className={classes.input} onChange={onChange} value={formValues.username} name="username" label="username" type="username" autoComplete="current-username" variant="outlined" required error={formErrors.username === "" ? false : true} helperText={formErrors.username} />
            <TextField className={classes.input} onChange={onChange} value={formValues.password} name="password" label="Password" type="password" autoComplete="current-password" variant="outlined" required error={formErrors.password === "" ? false : true} helperText={formErrors.password} />
          </div>
          <div className={classes.inputsContainer}>
            <InputLabel>Role:</InputLabel>
            <Select className={classes.input} onChange={onChange} name={'role'} value={formValues.role} label="Role" >
              <MenuItem value={'student'}>Student</MenuItem>
              <MenuItem value={'helper'}>Helper</MenuItem>
              <MenuItem value={'student and helper'}>Student & Helper</MenuItem>
            </Select>
          </div>
          <Button className={classes.button} disabled={buttonDisabled} type="submit" variant="contained" color="primary">Submit</Button>
        </form>
        <p style={{color: 'red'}}>{networkError}</p>
      </Paper>
    </Container>
  )
}
