import * as actions from '../actions/index';
import axios from "../../axios-config";
import { put } from "redux-saga/effects";

export function* initIngredientAsyncSaga(action) {
    try {
        const response = yield axios.get("ingredients.json");
        if (response.data !== null) {
            yield put(actions.setIngredients(response.data));
        }
        else {
            yield put(actions.fetchIngredientFailed());
        }
    } catch (error)
    {
        yield put(actions.fetchIngredientFailed());
    }
}