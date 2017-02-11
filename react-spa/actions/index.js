import 'fetch';

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
    type: LOGIN_FAILURE,
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
      body: `username=${creds.username}&password=${creds.password}`
    }).then(response => response.json().then(user => ({ user, response })))
    .then( ({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(signInError(user))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('token', user.access_token)
          // Dispatch the success action
          dispatch(receivedSignIn(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}
