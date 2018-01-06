import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, StyleSheet } from 'react-native';
import MessagesApi from "../api/api";

class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      messages: null,
    };
  }

  componentDidMount() {
    MessagesApi.listMessages().then(({messages}) => {
      this.setState({
        isLoading: false,
        messages: messages,
      })
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <Text style={styles.messagesList}>Messages List</Text>
        <MessagesListView messages={this.state.messages}/>
      </View>
    );
  }
}

const MessagesListView = ({messages}) => {
  console.log('messssss', messages)
  if (!messages.length) {
    return (
      <Text style={styles.noMessages}>No messages</Text>
    )
  }

  let lv = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  lv.cloneWithRows(messages);
  return (
    <ListView
      dataSource={messages}
      renderRow={(rowData) => <Text>{rowData.title}, {rowData.text}</Text>}
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