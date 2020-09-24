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
/// TONS OF LOGIC TO HANDLE SORTING STUFF
/// THAT COMES BACK FROM THE SERVER
function splitByBool(arr, bool) {
  // return two arrays, first one where
  // prop bool is false, one where prop bool is true
  const arrOfFalse = arr.filter(element => {
    return element[bool] === false;
  });
  const arrOfTrue = arr.filter(element => {
    return element[bool] === true;
  })
  return [arrOfFalse, arrOfTrue];
}
function sortArr(arr, prop) {
  // sort array by value of prop
  // prop probably needs to be an interger
  // but I haven't given it much thought.
  return arr.sort((a, b) => {
    if (a[prop] > b[prop]) return 1;
    if (a[prop] < b[prop]) return -1;
    return 0;
  })
}
function splitByFunction(arr, func, prop) {
  // same as splitByBool above, but uses function to find the element
  const arrOfFalse = arr.filter(element => {
    return func(element, prop) === false;
  })
  const arrOfTrue = arr.filter(element => {
    return func(element, prop) === true;
  })
  return [arrOfFalse, arrOfTrue];
}
function sortArrByFunction(arr, func, prop) {
  return arr.sort((a, b) => {
    if (a[func(a, prop)] > b[func(b, prop)]) return 1;
    if (a[func(a, prop)] < b[func(b, prop)]) return -1;
    return 0;
  })
}
function getIPropFromA(answer, prop) {
  // not sure how to drill down through props without
  // something like this
  return answer.issue[prop];
}
//// END OF LOGIC, START OF REDUCER
///  This should be the end of my having to touch this file.
///  If I do ever come back to this, I'll be splitting this up.
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
      //sort userIssues
      const splitIssues = splitByBool(action.payload.issues, 'isresolved');
      const userIssues = sortArr(splitIssues[0], 'id')
        .concat(sortArr(splitIssues[1], 'id'));
      //sort userAnswers the same way
      const answers = action.payload.answers;
      const splitAnswers = splitByFunction(answers, getIPropFromA, 'isresolved');
      const userAnswers = sortArrByFunction(splitAnswers[0], getIPropFromA, 'id')
        .concat(sortArrByFunction(splitAnswers[1], getIPropFromA, 'id'));
      return {
        ...state,
        fetching: false,
        // I need to sort userIssues
        // as the order of the array is mutable on the
        // backend. I could do this in the action creator
        // but as it directly relates to state
        // I'm going to put it here.
        // Hope I'm divying this up correctly
        userIssues,
        userAnswers,
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
