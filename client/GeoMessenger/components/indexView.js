import React from 'react';
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

export default IndexView = () => (
  <MenuContext style={{ flex: 1 }}>
    <TopNavigation/>
    <View style={styles.messagesList}><MessagesList/></View>
    <ActionButton onPress={() => console.log('abc')}/>
  </MenuContext>
)

const styles = StyleSheet.create({
  topNavigation: {
    paddingTop: 25,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    backgroundColor: 'lightblue',
  },
  title: {
    fontSize: 20,
  },
  messagesList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});