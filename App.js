/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {scaleSize} from "./src/utils/px2pt";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import AppReducer from './src/store/reducers';
import { AppNavigator, middleware } from './src/views/config';

const Store = createStore(AppReducer, applyMiddleware(middleware));

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
const styles = StyleSheet.create({
  container: {
    height:scaleSize(662),
    position:'relative',
    backgroundColor:'#EDEDED',
    zIndex:1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
