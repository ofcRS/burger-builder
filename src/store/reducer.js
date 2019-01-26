import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0
  },
  totalPrice: 3.5
}

const INGREDIENTS_COSTS = {
  cheese: 0.8,
  bacon: 1.6,
  salad: 0.3,
  meat: 2.4
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientsName]: state.ingredients[action.ingredientsName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_COSTS[action.ingredientsName]
      }
    case (actionTypes.REMOVE_INGREDIENT):
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientsName]: state.ingredients[action.ingredientsName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENTS_COSTS[action.ingredientsName]
      }
    default:
      return state;
  }
}

export default reducer;
