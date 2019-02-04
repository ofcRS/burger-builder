import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    purchased: false,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.INIT_INGREDIENTS):
            return {
                ...state,
                purchased: false
            };
        case (actionTypes.PURCHASE_BURGER):
            const newOrder = {
                ...action.orderData,
                orderId: action.orderId.name
            };
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            };
        case (actionTypes.PURCHASE_BURGER_FAIL):
            return {
                ...state,
                loading: false
            };
        case (actionTypes.START_PURCHASE_BURGER):
            return {
                ...state,
                loading: true
            };
        case (actionTypes.FETCH_ORDERS):
            return {
                ...state,
                orders: action.orders,
                loading: false
            };
        case (actionTypes.FETCH_ORDERS_FAIL):
            return {
              ...state,
              loading: false
            };
        case (actionTypes.START_FETCH_ORDERS):
            return {
                ...state,
                loading: true
            };
        default:
            return state
    }
};

export default reducer;