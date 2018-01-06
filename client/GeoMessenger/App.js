import React, { Component } from 'react';
import HomeView from "./components/homeView";
import { StackNavigator } from 'react-navigation';
import AddMessage from "./components/addMessage";

const Navigation = StackNavigator({
  Home: { screen: HomeView },
  AddMessage: { screen: AddMessage },
});

export default class App extends Component {
  render() {
    return <Navigation/>;
  }
}