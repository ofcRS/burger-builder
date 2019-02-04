import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurger = orderData => {
    return dispatch => {
        dispatch({type: actionTypes.START_PURCHASE_BURGER});
        axios.post('orders.json', orderData)
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

export const purchaseInit = () => {
  return {
      type: actionTypes.PURCHASE_INIT
  }
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch({type: actionTypes.START_FETCH_ORDERS});
        axios.get('/orders.json')
            .then(response => {
                console.log(response);
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