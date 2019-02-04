import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 3.5,
  error: false
};

const INGREDIENTS_COSTS = {
  cheese: 0.8,
  bacon: 1.6,
  salad: 0.3,
  meat: 2.4
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.ADD_INGREDIENT):
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientsName]: state.ingredients[action.ingredientsName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_COSTS[action.ingredientsName]
      };
    case (actionTypes.REMOVE_INGREDIENT):
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientsName]: state.ingredients[action.ingredientsName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENTS_COSTS[action.ingredientsName]
      };
    case (actionTypes.INIT_INGREDIENTS):
        return {
          ...state,
          ingredients: action.ingredients,
          totalPrice: 3.5
        };
    case (actionTypes.FETCH_INGREDIENTS_FAIL):
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
