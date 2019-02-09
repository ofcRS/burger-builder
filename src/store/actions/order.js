import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch({type: actionTypes.PURCHASE_BURGER_START});
        axios.post(`orders.json?auth=${token}`, orderData)
            .then(( response ) => {
                dispatch({
                    type: actionTypes.PURCHASE_BURGER,
                    orderData: orderData,
                    orderId: response.data.name
                });
            })
            .catch(() => {
                dispatch ({
                    type: actionTypes.PURCHASE_BURGER_FAIL
                })
            })
    }
};

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch({type: actionTypes.FETCH_ORDERS_START});
        axios.get(`/orders.json?auth=${token}`)
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                dispatch({
                    type: actionTypes.FETCH_ORDERS,
                    orders: fetchedOrders
                })
            })
            .catch(() => {
                dispatch({
                    type: actionTypes.FETCH_ORDERS_FAIL
                })
            })
    }
};
