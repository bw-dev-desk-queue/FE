import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import schema from '../validation/login_spec';
import { axiosWithSecret } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWhoIAm } from '../actions';

// INLINE STYLES //
const useStyles = makeStyles ({
  root: {
    width: '50%',
    margin: '0 auto',
    padding: '2% 0',
  },
  inputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-around',
    margin: '2% 0',
  },
  input: {
    margin: '4% 0',
  },
  h2: {
    margin: '0',
  },
  button: {
    width: '17%',
  }
})

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
  const [networkError, setNetworkError] = useState('');

  const classes = useStyles();

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
        console.log(err.response.data.error_description);
        const error = err.response.data.error_description  ?
          err.response.data.error_description : err;
      
        if (error.includes('Error')) {
          setNetworkError(error);
        } else {
          setNetworkError('Error: ' + error);
        }
        
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
    
    // handle networkError
    if (networkError.includes('cred') && name === 'password') {
      setNetworkError('');
    } else if (networkError.includes('name') && name === 'username') {
      setNetworkError('');
    }

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
      <Paper className={classes.root} elevation={3}>
        <h2 className={classes.h2}>Login</h2>
        <form className={classes.form} onSubmit={onSubmit}>
          <div className={classes.inputsContainer} >
            <TextField className={classes.input} onChange={onChange} value={formValues.username} name="username" label="username" type="username" autoComplete="current-username" variant="outlined" required error={formErrors.username === "" ? false : true} helperText={formErrors.username} />
            <TextField className={classes.input} onChange={onChange} value={formValues.password} name="password" label="Password" type="password" autoComplete="current-password" variant="outlined" required error={formErrors.password === "" ? false : true} helperText={formErrors.password} />
          </div>
          <Button className={classes.button} disabled={buttonDisabled} type="submit" variant="contained" color="primary">Login</Button>
        </form>
        <p style={{color: 'red'}}>{networkError}</p>
      </Paper>
    </Container>
  );
}

function mapStateToProps() {
  return {};
};

export default connect(mapStateToProps, { getWhoIAm })(Login);
