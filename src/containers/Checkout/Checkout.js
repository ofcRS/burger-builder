import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to="/" />;

    const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;

    if (this.props.ings) {
      summary = (
          <>
            {purchasedRedirect}
            <CheckoutSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.checkoutCancelledHandler}
                purchaseContinued={this.checkoutContinuedHandler} />
            <Route
                path={`${this.props.match.url}/contact-data`}
                component={ContactData} />
          </>
      )
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
      purchased: state.order.purchased
  }
};

export default connect(mapStateToProps)(Checkout);
