//import { delay } from 'redux-saga';
import { put,delay } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from "axios";

export function* logoutSaga(){

    yield localStorage.removeItem('token');
    yield localStorage.removeItem('exprirationDate');
    yield localStorage.removeItem('userId');

    yield put(actions.logoutSucceed());

}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
      email: action.email,
      password: action.password,
      returnSecureToken: true
    };
    let Url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCAZRpW6PE9wIUdUUqelMWr516wJSohvdU";
    if (!action.isSignUp) {
      Url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCAZRpW6PE9wIUdUUqelMWr516wJSohvdU";
    }
    try {
        const response = yield axios.post(Url, authData);

        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem("token", response.data.idToken);
        yield localStorage.setItem("exprirationDate", expirationDate);
        yield localStorage.setItem("userId", response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    }
    catch (error)
    {
        yield put(actions.authFailed(error.response.data.error))
    }
}

export function* authCheckStateSaga(action) {

     const token = yield localStorage.getItem("token");
     
     if (!token) {
       yield put(actions.logout());
     } else {
       const exprirationDate = yield new Date(localStorage.getItem("exprirationDate"));
       if (exprirationDate <= new Date()) {
         yield put(actions.logout());
       } else {
         const userId = yield localStorage.getItem("userId");
         yield put(actions.authSuccess(token, userId));
         yield put(actions.checkAuthTimeout((exprirationDate.getTime() - new Date().getTime()) / 1000));
       }
     }
}