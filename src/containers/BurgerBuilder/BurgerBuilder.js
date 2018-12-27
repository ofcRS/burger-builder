import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';

const INGREDIENTS_COSTS = {
  cheese: 0.8,
  bacon: 1.6,
  salad: 0.3,
  meat: 2.4
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 3.5,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios.get('/ingredients.json')
      .then( response => {
        this.setState({
          ingredients: response.data
        })
      })
      .catch( error => {
        this.setState({ error: true })
      })
  }

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
    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`)
    }

    queryParams.push(`${encodeURIComponent('price')}=${encodeURIComponent(this.state.totalPrice)}`)

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`
    });
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
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = (disabledInfo[key] === 0);
    };

    let burger = this.state.error ? <p style={{textAlign: 'center', fontSize: '32px', fontWeight: 'bold'}}>App cannot be loaded!</p> : <Spinner />;

    let orderSummary = null;

    if (this.state.ingredients) {
      burger = <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          price={this.state.totalPrice}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          purchasing={this.purchaseHandler}/>
      </Aux>

      orderSummary = <OrderSummary
          price={this.state.totalPrice}
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler} />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    };

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios);
