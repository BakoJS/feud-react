export default class API {
  constructor() {
    this.endPoint = 'http://localhost:3001';
  }

  questions = () => {
    return this.fetchWithHeader(`${this.endPoint}/questions`, {
      method: 'GET'
    }).then(res => {
      return Promise.resolve(res);
    });
  };

  saveQuestion = text => {
    return this.fetchWithHeader(`${this.endPoint}/question`, {
      method: 'POST',
      body: JSON.stringify({ text })
    }).then(res => {
      return Promise.resolve(res);
    });
  };

  deleteQuestion = id => {
    return this.fetchWithHeader(`${this.endPoint}/question/${id}`, {
      method: 'DELETE'
    }).then(res => {
      return Promise.resolve(res);
    });
  };

  /* eslint-disable */
  fetchWithHeader(url, options) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    return fetch(url, {
      headers,
      ...options
    })
      .then(response => {
        return response.json();
      })
      .catch(error => console.log(error));
  }
}
