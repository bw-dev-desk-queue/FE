import {
  LOGGING_IN,
  LOGGED_IN,
  LOGIN_FAIL,
  FETCH_ISSUES_START,
  FETCH_ISSUES_SUCCESS,
  FETCH_ISSUES_FAIL,
} from '../actions';


const initialState = {
  issues: [],
  answers: [],
  accountInfo: {type: '', id: ''},
  fetching: 'false',
  error: '',
}

export default function reducer( state = initialState, action ) {
  switch( action.type )
  {
    case LOGGING_IN:
      return {...state, fetching: true}
    case LOGGED_IN:
      return {
        ...state,
        fetching: false,
        accountInfo: action.payload
      }
    case LOGIN_FAIL:
      return {
        ...state,
        fetching: false,
        error: action.payload
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
