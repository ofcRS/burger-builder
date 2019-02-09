import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return ({showSideDrawer: !prevState.showSideDrawer})
        })
    };

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    };

    render() {
        return (
            <>
                <SideDrawer open={this.state.showSideDrawer} isAuth={this.props.isAuth} closed={this.sideDrawerClosedHandler}/>
                <Toolbar isAuth={this.props.isAuth} drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
};

export default withRouter(connect(mapStateToProps)(Layout));
