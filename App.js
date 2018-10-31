/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'
import AppReducer from './src/store/reducers';
import { AppNavigator, middleware } from './src/views/config';

const Store = createStore(AppReducer, applyMiddleware(middleware,thunk,createLogger));

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={Store}>
        <AppNavigator />
      </Provider>
    );
  }
}
export {App,Store}
