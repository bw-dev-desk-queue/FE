import {
  LOGOUT,
  FETCH_ISSUES_START,
  FETCH_ISSUES_SUCCESS,
  FETCH_ISSUES_FAIL,
  WHOAMI_START,
  WHOAMI_SUCCESS,
  WHOAMI_FAIL,
  POST_ISSUE_START,
  POST_ISSUE_SUCCESS,
  POST_ISSUE_FAIL,
  POST_ANSWER_START,
  POST_ANSWER_SUCCESS,
  POST_ANSWER_FAIL
} from '../actions';


const initialState = {
  issues: [],
  userIssues: [],
  userAnswers: [],
  accountInfo: {roles: [], id: null, username: ''},
  fetching: 'false',
  error: '',
}
export default function reducer( state = initialState, action ) {
  switch( action.type )
  {
    case LOGOUT:
      return {
        ...initialState,

      }
    case WHOAMI_START:
      return {
        ...state,
        fetching: true,
      }
    case WHOAMI_SUCCESS:
      return {
        ...state,
        fetching: false,
        userIssues: action.payload.issues,
        userAnswers: action.payload.answers,
        accountInfo: {
          username: action.payload.username,
          roles: action.payload.roles,
          id: action.payload.id
        }
      }
    case WHOAMI_FAIL:
      return {
        ...state,
        fetching: false,
      }
    case FETCH_ISSUES_START:
      return {
        ...state,
        fetching: true,
      }
    case FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        fetching: false,
        issues: action.payload 
        }
    case FETCH_ISSUES_FAIL:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    case POST_ISSUE_START:
    case POST_ISSUE_FAIL:
    case POST_ISSUE_SUCCESS:
    case POST_ANSWER_START:
    case POST_ANSWER_FAIL:
    case POST_ANSWER_SUCCESS:
    default:
      return state;
  }
};
