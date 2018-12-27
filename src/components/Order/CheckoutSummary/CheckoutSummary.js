import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Nice choice! It looks delicious!</h1>
      <div style={{margin: 'auto'}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        btnType="Danger"
        clicked={props.purchaseCancelled}>Cancel</Button>
      <Button
        btnType="Success"
        clicked={props.purchaseContinued}>Continue</Button>
    </div>
  )
}

export default checkoutSummary;
