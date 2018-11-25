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
      <BuildControl label={ctrl.label} key={ctrl.label} />
    ))}
  </div>
);

export default buildControls;
