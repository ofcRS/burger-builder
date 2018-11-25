import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_COSTS = {
  cheese: 0.8,
  bacon: 1.6,
  salad: 0.3,
  meat: 2.4
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 0,
      cheese: 0,
      meat: 0,
      salad: 0
    },
    totalPrice: 3.5,
    purchasable: false,
    purchasing: false
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  }

  purchaseContinueHandler = () => {
    alert('You continue!')
  }

  addIngredientHandler = (type) => {
    const newIngredients = {
      ...this.state.ingredients
    };
    newIngredients[type] += 1;
    const newTotalPrice = this.state.totalPrice + INGREDIENTS_COSTS[type];
    this.setState({ingredients: newIngredients, totalPrice: newTotalPrice});
    this.updatePurchasable(newIngredients);
  };

  removeIngredientHandler = (type) => {
    const newIngredients = {
      ...this.state.ingredients
    };
    newIngredients[type] -= 1;
    if (newIngredients[type] < 0) {
      return;
    }
    const newTotalPrice = this.state.totalPrice - INGREDIENTS_COSTS[type];
    this.setState({ingredients: newIngredients, totalPrice: newTotalPrice});
    this.updatePurchasable(newIngredients);
  }

  updatePurchasable(ingredients) {
    this.setState({
      purchasable: (Object.values(ingredients).reduce((sum, el) => {
        return sum + el
      }, 0)) > 0
    })
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = (disabledInfo[key] === 0);
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          price={this.state.totalPrice}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          purchasing={this.purchaseHandler}/>
      </Aux>
    )
  }
}

export default BurgerBuilder;
