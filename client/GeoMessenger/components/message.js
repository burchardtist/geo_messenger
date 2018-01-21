import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { List, ListItem } from "react-native-elements";

const Message = ({item}) => {
  const {title, text, distance} = item;
  let parsedDistance;
  if(distance <= 1) {
    parsedDistance = `${Math.round(distance*1000)} meters`;
  } else {
    parsedDistance = `${distance.toFixed(3)}km`;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.location}>distance: { parsedDistance }</Text>
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