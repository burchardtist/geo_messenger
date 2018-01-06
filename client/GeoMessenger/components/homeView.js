import React, { Component } from 'react';
import  { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import MessagesList from "./messagesList";
import ActionButton from 'react-native-action-button';

const TopNavigation = () => (
  <View style={ styles.topNavigation }>
    <View style={{ flex: 1 }}><Text style={ styles.title }>GeoMessenger</Text></View>
    <Menu onSelect={(value) => alert(`User selected the number ${value}`)}>
      <MenuTrigger>
        <Icon size={34} name="menu"/>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption value={1}>
          <Text>One</Text>
        </MenuOption>
        <MenuOption value={2}>
          <Text>Two</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  </View>
);

class HomeView extends Component {
  static navigationOptions = {
    title: 'Messages List',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <View style={styles.messagesList}><MessagesList/></View>
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="New Message"
          onPress={() => navigate('AddMessage')}>
          <Icon name="message" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  messagesList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default HomeView;