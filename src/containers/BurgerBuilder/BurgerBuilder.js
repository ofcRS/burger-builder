import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_COSTS = {
  cheese: 0.8,
  bacon: 1.6,
  salad: 0.3,
  meat: 2.4
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      cheese: 0,
      bacon: 0,
      salad: 0,
      meat: 0
    },
    totalPrice: 4
  };

  addIngredientHandler = (type) => {
    const newIngredients = {...this.state.ingredients};
    newIngredients[type] += 1;
    const newTotalPrice = this.state.totalPrice + INGREDIENTS_COSTS[type];
    this.setState({
      ingredients: newIngredients,
      totalPrice: newTotalPrice
    })
  };

  removeIngredientHandler = (type) => {
    const newIngredients = {...this.state.ingredients};
    newIngredients[type] -= 1;
    const newTotalPrice = this.state.totalPrice - INGREDIENTS_COSTS[type];
    this.setState({
      ingredients: newIngredients,
      totalPrice: newTotalPrice
    })
  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler} />
      </Aux>
    )
  }
}

export default BurgerBuilder;
