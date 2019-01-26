import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import reducer from './store/reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Layout from './hoc/Layout/Layout';

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Layout>
              <Route path="/" exact component={BurgerBuilder} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
            </Layout>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
