import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import t from 'tcomb-form-native';
import MessagesApi from "../api/api";

const MessageForm = t.form.Form;

const Message = t.struct({
  title: t.String,
  text: t.String,
  life_time: t.maybe(t.Number),
  range: t.maybe(t.Number),
  lat: t.maybe(t.Number),
  lon: t.maybe(t.Number),
});

const formStyles = {
  ...MessageForm.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
};

const options = {
  fields: {
    title: {
      error: 'Title is required',
    },
    text: {
      error: 'Text is required',
    },
    lat: {
      hidden: true,
    },
    lon: {
      hidden: true,
    }
  },
  stylesheet: formStyles,
};


class AddMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
    };
  }

  static navigationOptions = {
    title: 'Add new message',
  };

  handleSubmit = () => {
    const formValues = this._form.getValue();
    if (!formValues){
      return;
    }

    MessagesApi.addMessage(formValues)
      .then((responseJson) => {
        if(responseJson) {
          this.props.navigation.goBack();
        }
      })
  };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.setState({
          value: {
            lat: coords.latitude,
            lon: coords.longitude,
          }
        });
      },
      (error) => console.error(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MessageForm
          ref={c => this._form = c}
          type={Message}
          options={options}
          value={this.state.value}
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