import { axiosWithAuth } from '../utils/axiosWithAuth.js'
export const LOGOUT = 'LOGOUT';
export const FETCH_ISSUES_START = 'FETCH_ISSUES_START';
export const FETCH_ISSUES_SUCCESS = 'FETCH_ISSUES_SUCCESS';
export const FETCH_ISSUES_FAIL = 'FETCH_ISSUES_FAIL';
export const WHOAMI_START = 'WHOAMI_START';
export const WHOAMI_SUCCESS = 'WHOAMI_SUCCESS';
export const WHOAMI_FAIL = 'WHOAMI_FAIL';
export const POST_ISSUE_START = 'POST_ISSUE_START';
export const POST_ISSUE_SUCCESS = 'POST_ISSUE_SUCCESS';
export const POST_ISSUE_FAIL = 'POST_ISSUE_FAIL';
export const POST_ANSWER_START = 'POST_ANSWER_START';
export const POST_ANSWER_SUCCESS = 'POST_ANSWER_SUCCESS';
export const POST_ANSWER_FAIL = 'POST_ANSWER_FAIL';


export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT })
}

export const getWhoIAm = () => (dispatch) => {
    console.log('running');
    dispatch({ type: WHOAMI_START });
    axiosWithAuth().get('/users/whoami')
      .then(res => {
        console.log("WHOAMI: ", res);
        dispatch({ type: WHOAMI_SUCCESS, payload: res.data });
      })
      .catch(err => {
        console.log(err);
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

export const postIssue = (issue, historyObj) => (dispatch) => {
  dispatch({type: POST_ISSUE_START});
  axiosWithAuth().post(`/issues/issues`, issue)
    .then(res => {
      console.log('post', res);
      dispatch({type: POST_ISSUE_SUCCESS});
      historyObj.push('/account');
        
    })
    .catch(err => {
      console.log('POST ERROR:', err);
    })
}

export const postAnswer = (issueId, message) => (dispatch) => {
  dispatch({type: POST_ANSWER_START});
  console.log(issueId, message)
  axiosWithAuth()
    .post(`/answers/issueid/${issueId}`,
      {answer: message}
    )
    .then(res => {
      console.log(res);
      dispatch({type: POST_ANSWER_SUCCESS})
      dispatch(getWhoIAm());
    })
    .catch(err => {
      console.log(err)
      dispatch({type: POST_ANSWER_FAIL})
    })
}
