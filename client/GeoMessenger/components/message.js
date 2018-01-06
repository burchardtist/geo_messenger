import React from "react";
import { Text, View } from "react-native";

const Message = ({item}) => {
  const {title, text} = item;
  return (
    <View>
      <Text>{title}</Text>
      <Text>{text}</Text>
    </View>
  )
};

export default Message;