import React, {Component, Suspense, lazy} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';

const Auth = lazy(() => import("./containers/Auth/Auth"));
const BurgerBuilder = lazy(() => import("./containers/BurgerBuilder/BurgerBuilder"));
const Checkout = lazy(() => import("./containers/Checkout/Checkout"));
const Orders = lazy(() => import("./containers/Orders/Orders"));
const Logout = lazy(() => import("./containers/Auth/Logout/Logout"));

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    render() {
        let routes = (
            <>
                <Suspense fallback={null}>
                    <Switch>
                        <Route path="/auth" component={props => <Auth {...props} />}/>
                        <Route path="/" component={props => <BurgerBuilder {...props} />}/>
                        <Redirect to="/"/>
                    </Switch>
                </Suspense>
            </>
        );

        if (this.props.isAuth) {
            routes = (
                <>
                    <Suspense fallback={null}>
                        <Switch>
                            <Route path="/checkout" component={props => <Checkout {...props} />}/>
                            <Route path="/orders" component={props => <Orders {...props} />} />
                            <Route path="/auth" component={props => <Auth {...props} />}/>
                            <Route path="/logout" component={props => <Logout {...props} />}/>
                            <Route path="/" component={props => <BurgerBuilder {...props} />}/>
                            <Redirect to="/"/>
                        </Switch>
                    </Suspense>
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
