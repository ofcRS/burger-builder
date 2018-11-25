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
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        type={ctrl.type}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]} />

    ))}
  </div>
);

export default buildControls;
