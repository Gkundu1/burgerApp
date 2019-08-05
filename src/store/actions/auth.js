import * as actionTypes from './actionTypes';
//import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const authenticateAsync = (email, password, isSignUp) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignUp:isSignUp
    };

    // return dispatch => {
    //     dispatch(authStart());
    //     const authData = {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //     };
    //     let Url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCAZRpW6PE9wIUdUUqelMWr516wJSohvdU";
    //     if (!isSignUp) {
    //         Url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCAZRpW6PE9wIUdUUqelMWr516wJSohvdU";
    //     }
    //     axios.post(Url, authData)
    //         .then(response => {
    //             console.log("signup response", response);
    //             const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    //             localStorage.setItem('token', response.data.idToken);
    //             localStorage.setItem('exprirationDate', expirationDate);
    //             localStorage.setItem('userId', response.data.localId);
    //             dispatch(authSuccess(response.data.idToken, response.data.localId));
    //             dispatch(checkAuthTimeout(response.data.expiresIn));
    //         }).catch(error => {
    //             console.log("signUp error", error.response.data.error);
    //             dispatch(authFailed(error.response.data.error));
    //         });
    // };
};

export const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('exprirationDate');
    // localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INIT_LOGOUT
    };
};

export const logoutSucceed=()=>{
    return {
        type:actionTypes.AUTH_LOGOUT
    };
};


export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    };
    // return dispatch => {
    //     setTimeout(() => {
    //         dispatch(logout());
    //     }, expirationTime * 1000);
    // };
};

export const seAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_INITIAL_STATE
    };

    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     const userId = localStorage.getItem('userId');
    //     if (!token) {
    //        dispatch(logout());
    //     }
    //     else {
    //         const exprirationDate = new Date(localStorage.getItem('exprirationDate'));
    //         if (exprirationDate < new Date()) {
    //             dispatch(logout());
    //         }
    //         else {
    //             dispatch(authSuccess(token, userId));
    //             dispatch(checkAuthTimeout((exprirationDate.getTime() - new Date().getTime())/1000));
    //         }
    //     }
    // };
};
