import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.css';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {props.isAuth
                ? <NavigationItem link="/orders">Orders</NavigationItem>
                : null}
            {props.isAuth
                ? <NavigationItem link="/logout">Log out</NavigationItem>
                : <NavigationItem link="/auth">Sign in/Sign up</NavigationItem>}
        </ul>
    )
};

export default navigationItems;
