import settings from "../config/settings";

const MessagesApi = {
  callApi: function(method, body) {
    let callSettings = {
      method: method
    };

    if(method === 'POST') {
      settings['headers'] = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      console.log(JSON.stringify(body))
      settings['body'] = JSON.stringify(body);
    }

    return fetch(
      settings.apiUrl, {
        method: method,
        callSettings,
      }).then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
  },
  listMessages: function() {
    return this.callApi('GET');
  },
  addMessage: function({title, text}) {
    return this.callApi('POST', {
      title: title,
      text: text,
    })
  }
};

export default MessagesApi;