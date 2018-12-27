import React from 'react';

import classes from './Order.css';

const order = (props) => (
  <div className={classes.Order}>
      {Object.keys(props.ingredients).map( inKey => {
        return (
          <li key={inKey}>
            <span style={{textTransform: 'capitalize'}}>{inKey}:</span> {props.ingredients[inKey]}
          </li>
        )
      })}
    <p>Total Price: <strong>{`USD ${props.price.toFixed(1)}`}</strong></p>
  </div>
);

export default order;
