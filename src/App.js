import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Checkout from './containers/Checkout/Checkout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';


class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    render() {
        let routes = (
            <>
                <Switch>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/" component={BurgerBuilder}/>
                    <Redirect to="/"/>
                </Switch>
            </>
        );

        if (this.props.isAuth) {
            routes = (
                <>
                    <Switch>
                        <Route path="/checkout" component={Checkout}/>
                        <Route path="/orders" component={Orders}/>
                        <Route path="/auth" component={Auth}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/" component={BurgerBuilder}/>
                        <Redirect to="/"/>
                    </Switch>
                </>
            )
        }

        return (
            <BrowserRouter>
                <Layout>
                    {routes}
                </Layout>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
};

const mapActionsToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    }
};

export default connect(mapStateToProps, mapActionsToProps)(App);
