import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import t from 'tcomb-form-native';
import MessagesApi from "../api/api";

const MessageForm = t.form.Form;

const Message = t.struct({
  title: t.String,
  text: t.String,
});

class AddMessage extends Component {
  static navigationOptions = {
    title: 'Add new message',
  };

  handleSubmit = () => {
    const formValues = this._form.getValue(); // use that ref to get the form value
    if (!formValues){
      return;
    }
    MessagesApi.addMessage(formValues)
      .then((responseJson) => {
        const { navigate } = this.props.navigation;
        navigate('Home');
      })
  };

  render() {
    return (
      <View style={styles.container}>
        <MessageForm
          ref={c => this._form = c}
          type={Message}
        />
        <Button
          title="Add"
          onPress={this.handleSubmit}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});

export default AddMessage;