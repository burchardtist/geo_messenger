import React, { Component } from 'react';
import  { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import MessagesList from "./messagesList";
import ActionButton from 'react-native-action-button';

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
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
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