import settings from "../config/settings";

const MessagesApi = {
  callApi: function(endpoint, method, body) {
    let options = {
      method: method
    };

    if(method === 'POST') {
      options['headers'] = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
      options['body'] = JSON.stringify(body);
    }

    return new Promise((resolve, reject) => {
      fetch(settings.apiUrl + endpoint, options)
        .then(response => {
          if(response.ok) {
            return resolve(response.json());
          }
          return reject(response.json());
        }).catch((error) => {
          console.error(error);
        });
    });
  },
  listMessages: function() {
    return this.callApi('messagesList', 'GET');
  },
  addMessage: function({title, text, life_time, range, lat, lon}) {
    return this.callApi('addMessage', 'POST', {
      title: title,
      text: text,
      life_time: life_time,
      range: range,
      lat: lat,
      lon: lon
    })
  }
};

export default MessagesApi;