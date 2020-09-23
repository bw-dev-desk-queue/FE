import {
  LOGOUT,
  FETCH_ISSUES_START,
  FETCH_ISSUES_SUCCESS,
  FETCH_ISSUES_FAIL,
  WHOAMI_START,
  WHOAMI_SUCCESS,
  WHOAMI_FAIL,
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
    default:
      return state;
  }
};
