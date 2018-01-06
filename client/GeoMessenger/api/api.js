import settings from "../config/settings";

const MessagesApi = {
  callApi: function(method, body) {
    return fetch(
      settings.apiUrl, {
        method: method,
        body: method === 'GET' ? undefined : JSON.stringify(body),
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