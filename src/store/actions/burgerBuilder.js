import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then( response => {
                dispatch({type: actionTypes.INIT_INGREDIENTS, ingredients: response.data})
            })
            .catch( () => {
                dispatch({type: actionTypes.FETCH_INGREDIENTS_FAIL})
            })
    }
};

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientsName: ingName
    }
};

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientsName: ingName
    }
};