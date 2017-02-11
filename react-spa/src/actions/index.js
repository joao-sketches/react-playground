export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS' ;
export const SIGNIN_ERROR = 'SIGNIN_ERROR';

function requestSignIn(credentials) {
  return {
    type: SIGNIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    credentials
  };
}

function receivedSignIn(user) {
    return {
      type: SIGNIN_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      token: user.access_token
    };
}

function signInError(error) {
  return {
    type: SIGNIN_ERROR,
    isFetching: false,
    isAuthenticated: false,
    message: error.details
  }
}

export function signIn(credentials) {
  return dispatch => {
    dispatch(requestSignIn(credentials));
    return fetch('http://localhost:4000/api/sessions/create', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: `username=${credentials.username}&password=${credentials.password}`
    }).then(r => r.json().then(body => {r, body}))
    .then(({r, body}) => {
      if (!r.ok) {
        console.log(body);
        dispatch(signInError(body || {details: "Unable to reach server"}))
        return Promise.reject(body)
      } else {
        localStorage.setItem('token', body.access_token)
        // Dispatch the success action
        dispatch(receivedSignIn(body))
      }
    }).catch(err => {
      dispatch(signInError({details: "Unable to reach server"}))
      console.log("Error: ", err)});
  }
}
