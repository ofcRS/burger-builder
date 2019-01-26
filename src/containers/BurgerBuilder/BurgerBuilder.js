import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // axios.get('/ingredients.json')
    //   .then( response => {
    //     this.setState({
    //       ingredients: response.data
    //     })
    //   })
    //   .catch( error => {
    //     this.setState({ error: true })
    //   })
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
    this.props.history.push({
      pathname: '/checkout'
    });
  }

  // addIngredientHandler = (type) => {
  //   const newIngredients = {
  //     ...this.state.ingredients
  //   };
  //   newIngredients[type] += 1;
  //   const newTotalPrice = this.state.totalPrice + INGREDIENTS_COSTS[type];
  //   this.setState({ingredients: newIngredients, totalPrice: newTotalPrice});
  //   this.updatePurchasable(newIngredients);
  // };
  //
  // removeIngredientHandler = (type) => {
  //   const newIngredients = {
  //     ...this.state.ingredients
  //   };
  //   newIngredients[type] -= 1;
  //   if (newIngredients[type] < 0) {
  //     return;
  //   }
  //   const newTotalPrice = this.state.totalPrice - INGREDIENTS_COSTS[type];
  //   this.setState({ingredients: newIngredients, totalPrice: newTotalPrice});
  //   this.updatePurchasable(newIngredients);
  // }

  updatePurchasable(ingredients) {
    return (Object.values(ingredients).reduce((sum, el) => {
      return sum + el
    }, 0)) > 0
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = (disabledInfo[key] === 0);
    };

    let burger = this.state.error ? <p style={{textAlign: 'center', fontSize: '32px', fontWeight: 'bold'}}>App cannot be loaded!</p> : <Spinner />;

    let orderSummary = null;

    if (this.props.ings) {
      burger = <Aux>
        <Burger ingredients={this.props.ings}/>
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          price={this.props.price}
          disabled={disabledInfo}
          purchasable={this.updatePurchasable(this.props.ings)}
          purchasing={this.purchaseHandler}/>
      </Aux>

      orderSummary = <OrderSummary
          price={this.props.price}
          ingredients={this.props.ings}
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapActionToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientsName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientsName: ingName})
  }
}

export default connect(mapStateToProps, mapActionToProps)(withErrorHandler(BurgerBuilder, axios));
