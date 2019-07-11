import * as actionType from '../store/actions';


const initialState = {
    ingredients: {
        Cheese: 0,
        Salad: 0,
        Bacon: 0,
        meat: 0
    },
    totalPrice: 4,
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
        totalPrice:state.totalPrice+INGREDIENT_PRICES[action.ingredientName]
    }
}

const removeIngredientFromBurger = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice:state.totalPrice-INGREDIENT_PRICES[action.ingredientName]
    }
}


export default reducer;