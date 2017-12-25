import {
    baseURL, 
    indicateServerCommunicationAction,
    errorCommunicatingWithServerAction
} from './common';

import firebaseApp from '../firebase';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export function registerUser (email, password) {
    return (dispatch) => {
        
        dispatch(indicateServerCommunicationAction(true));

        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            
            dispatch(indicateServerCommunicationAction(false));
            dispatch(registerUserSuccessAction());
        })
        .catch((error) => {
            
            dispatch(indicateServerCommunicationAction(false));
            dispatch(errorCommunicatingWithServerAction(error, "Error while logging in."));
        });
    };
}

export function registerUserSuccessAction(user) {
    return {
        type: REGISTER_USER_SUCCESS,
        user
    };
}

export function loginUser (email, password) {
    return (dispatch) => {

        dispatch(indicateServerCommunicationAction(true));
        
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
    
            dispatch(indicateServerCommunicationAction(false));
            dispatch(loginUserSuccessAction(user));
        })
        .catch((error) => {
            console.log('error while logging user: ', error);
            dispatch(indicateServerCommunicationAction(false));
            dispatch(errorCommunicatingWithServerAction(error, "Error while logging user."));
        });
    };
}

export function loginUserSuccessAction(user) {
    return {
        type: LOGIN_USER_SUCCESS,
        user
    };
}

export function logoutUser () {
    return (dispatch) => {

        dispatch(indicateServerCommunicationAction(true));

        firebaseApp.auth().signOut()
        .then(() => {
            dispatch(indicateServerCommunicationAction(false));
            dispatch(signUserSuccessAction());
        })
        .catch((error) => {
            dispatch(indicateServerCommunicationAction(false));
            dispatch(errorCommunicatingWithServerAction(error, "Error while signing out."));
        });
    };
}

export function signUserSuccessAction() {
    return {
        type: LOGOUT_USER_SUCCESS,
    };
}

