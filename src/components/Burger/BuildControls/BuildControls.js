import React from 'react';
import BuildControl from './BuildControl/BuildControl'

import classes from './BuildControls.css'

const controls = [
  {label: 'Meat', type: 'meat'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'}
]

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>The current price: <strong>{props.price.toFixed(2)}$</strong></p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        type={ctrl.type}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]} />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.purchasing}>Order now</button>
  </div>
);

export default buildControls;
