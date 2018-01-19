import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { List, ListItem } from "react-native-elements";

const Message = ({item}) => {
  const {title, text, lat, lon} = item;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.location}>lat: {lat} lon: {lon}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DDD',
    paddingTop: 10,

  },
  title: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  location: {
    fontSize: 15,
  },
  text: {
    fontSize: 20,
  }
});

export default Message;