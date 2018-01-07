import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import MessagesApi from "../api/api";
import Message from "./message";

class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: null,
    };
  }

  getMessages() {
    MessagesApi.listMessages().then(({ messages }) => {
      if(messages !== undefined) {
        this.setState({
          messages: messages,
        });
      }
    });
  }

  componentDidMount() {
    this.getMessages();
    this.messagesInterval = setInterval(() => {
      this.getMessages()
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.messagesInterval);
  }

  render() {
    if (!this.state.messages) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <MessagesListView messages={this.state.messages}/>
      </View>
    );
  }
}

const MessagesListView = ({messages}) => {
  if (!messages.length) {
    return (
      <Text style={styles.noMessages}>No messages</Text>
    )
  }

  return (
    <FlatList
      data={messages}
      renderItem={({item}) => <Message item={item}/> }
      keyExtractor={(item, index) => item.id}
    />
  )
};

const styles = StyleSheet.create({
  messagesList: {
    fontSize: 20,
    textAlign: 'center',
  },
  noMessages: {
    textAlign: 'center',
  },
});

export default MessagesList;