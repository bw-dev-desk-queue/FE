import { axiosWithAuth } from '../utils/axiosWithAuth.js'

export const LOGGING_IN = 'LOGGING_IN';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const FETCH_ISSUES_START = 'FETCH_ISSUES_START';
export const FETCH_ISSUES_SUCCESS = 'FETCH_ISSUES_SUCCESS';
export const FETCH_ISSUES_FAIL = 'FETCH_ISSUES_FAIL';
export const WHOAMI_START = 'WHOAMI_START';
export const WHOAMI_SUCCESS = 'WHOAMI_SUCCESS';
export const WHOAMI_FAIL = 'WHOAMI_FAIL';

export const login = (credentials) => (dispatch) => {
  dispatch({type: LOGGING_IN})
  axiosWithAuth().get('/login', credentials)
    .then(res => {
      console.log(res);
      dispatch({type: LOGGED_IN, payload: res.data});
    })
    .catch(error => {
      console.log(error);
      dispatch({type: LOGIN_FAIL, payload: error.errors});
    })
}

export const getWhoIAm = () => (dispatch) => {
    console.log('running');
    dispatch({ type: WHOAMI_START });
    axiosWithAuth().get('/users/user/2')
      .then(res => {
        console.log("WHOAMI: ", res);
        dispatch({ type: WHOAMI_SUCCESS, payload: res.data });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: WHOAMI_FAIL });
      });
  };

export const getUserIssues = (id) => (dispatch) => {
  dispatch({type: FETCH_ISSUES_START})
  axiosWithAuth().get(`/issues/userid/${id}`)
    .then(res => {
      console.log('URL FOR ISSUES SOMEWHERE IN HERE:', res);
      axiosWithAuth().get('theurl')
        .then(res => {
          console.log(res);

        })
    })
}

export const getAllIssues = () => (dispatch) => {
  dispatch({type: FETCH_ISSUES_START})
  axiosWithAuth().get(`/issues/issues/`)
    .then(res => {
      console.log('issues: ', res.data);
      dispatch({type: FETCH_ISSUES_SUCCESS, payload: res})
    })
    .catch(err => {
      console.log('ERROR FETCHING');
      dispatch({type: FETCH_ISSUES_FAIL, payload: err})
    })
}