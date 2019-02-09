import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let orders = <Spinner/>;

        if (!this.props.loading) {
            orders = this.props.orders.filter(order => {
                return (order.userId === this.props.userId)
            }).map(order => (<Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    contacts={order.contacts}/>
            ));
        }

        return (
            <>
                {orders}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapActionToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actionTypes.fetchOrders(token))
    }
};

export default connect(mapStateToProps, mapActionToProps)(withErrorHandler(Orders, axios));
