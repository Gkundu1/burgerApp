import * as actionType from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  Salad: 2.5,
  Cheese: 3,
  meat: 2.5,
  Bacon: 5.5
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADDINGREDIENT:
      return addIngredientToBurger(state, action);
    case actionType.REMOVEINGREDIENT:
      return removeIngredientFromBurger(state, action);
    case actionType.INITINGREDIENT:
        return updateObject(state,{
            ingredients: {
                Salad: action.ingredients.Salad,
                Bacon: action.ingredients.Bacon,
                Cheese: action.ingredients.Cheese,
                meat: action.ingredients.meat
              },
              totalPrice: 4,
              error: false
        });
    case actionType.FETCHINGREDIENTFAILED:
        return updateObject(state,{
            error: true
        });
    default:
      return state;
  }
};

const addIngredientToBurger = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  };
  return updateObject(state,updatedState);
};

const removeIngredientFromBurger = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      };
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
      return updateObject(state,updatedState);
};

export default reducer;
