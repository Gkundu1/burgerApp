import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from "./auth";
import { initIngredientAsyncSaga } from './burgerBuilder';
import { purchaseBurgerAsyncSaga,fetchOrderAsyncSaga } from "./order";
import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth()
{
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT,checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_INIT_LOGOUT,logoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder()
{
  yield takeEvery(actionTypes.INIT_INGREDIENT_SAGA, initIngredientAsyncSaga); 
}

export function* watchOrder()
{
  yield takeEvery(actionTypes.PURCHASE_BURGER_SAGA, purchaseBurgerAsyncSaga);
  yield takeEvery(actionTypes.FETCH_ORDER_SAGA, fetchOrderAsyncSaga);
}