import * as actions from '../actions/index';
import { put } from "redux-saga/effects";
import axios from '../../axios-config';

export function* purchaseBurgerAsyncSaga(action) {
         yield put(actions.purchaseBurgerStart());
         try {
           const response = yield axios.post(
             "/orders.json?auth=" + action.token,
             action.orderData
           );
           if (response != null) {
             yield put(
               actions.purchaseBurgerSuccess(
                 response.data.name,
                 action.orderData
               )
             );
           }
         } catch (error) {
           yield put(actions.purchaseBurgerFailed(error));
         }
}
       
export function* fetchOrderAsyncSaga(action)
{
   yield put(actions.fetchOrderStart());
   //const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
  const tokenQueryParams = "?auth=" + action.token;
  try {
    const response = yield axios.get("/orders.json" + tokenQueryParams);
    if (response != null)
    {
      const serverOrder = [];
       for (let key in response.data) {
         serverOrder.push({
           ...response.data[key],
           id: key
         });
      }
      yield put(actions.fetchOrderSuccess(serverOrder));
    }
  }
  catch (error)
  {
    yield put(actions.fetchOrderFailed(error));
  }
}