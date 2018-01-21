import React, { Component } from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { List } from 'react-native-elements';
import { ListView } from 'react-native';
import MessagesApi from "../api/api";
import Message from "./message";

class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
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
        <View style={styles.spinner}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.messagesList}>
        <MessagesListView messages={this.state.messages}/>
      </View>
    );
  }
}

const renderRow = (rowData, sectionID) => {
  return (
    <Message item={rowData}/>
  )
};

const MessagesListView = ({messages}) => {
  if (!messages.length) {
    return (
      <Text style={styles.noMessages}>No messages</Text>
    )
  }

  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  const dataSource = ds.cloneWithRows(messages);

  return (
    <List>
      <ListView
        renderRow={renderRow}
        dataSource={dataSource}
      />
    </List>
  )
};

const styles = StyleSheet.create({
  messagesList: {
    flex: 1,
  },
  noMessages: {
    textAlign: 'center',
  },
  spinner: {
    flex: 1,
    paddingTop: 20
  },
});

export default MessagesList;