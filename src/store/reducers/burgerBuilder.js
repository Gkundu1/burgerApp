import * as actionType from '../actions/actionTypes';


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    Salad: 5,
    Cheese: 3,
    meat: 4,
    Bacon: 5.5
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADDINGREDIENT:
            return addIngredientToBurger(state, action);
        case actionType.REMOVEINGREDIENT:
            return removeIngredientFromBurger(state, action);
        case actionType.INITINGREDIENT:
            return {
                ...state,
                ingredients: {
                    Salad:action.ingredients.Salad,
                    Bacon:action.ingredients.Bacon,
                    Cheese:action.ingredients.Cheese,
                    meat:action.ingredients.meat
                },
                error: false
            }
        case actionType.FETCHINGREDIENTFAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
};

const addIngredientToBurger = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
}

const removeIngredientFromBurger = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
}


export default reducer;