class Api {
  constructor(config) {
    this._url =  config.baseUrl;
    this._headers = config.headers;
  }

  handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json()
      .then((err) => Promise.reject({
        status: res.status,
        message: err.message,
      }));
  }

  mainHeaders() {
    const token = localStorage.getItem('jwt');
    return {
      'Content-Type': 'application/json',
      "authorization": `Bearer ${token}`,
    };
  };

  /* Unprotected requests */
  // User requests

  signUp({ name, email, password }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "name": name,
        "email": email,
        "password": password,
      })
    })
    .then(res => this.handleResponse(res));
  };

  signIn(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "email": email,
        "password": password,
      })
    })
    .then(res => this.handleResponse(res));
  };

  /* Protected requests */

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this.mainHeaders(),
    })
    .then(res => this.handleResponse(res));
  };

  changeUserInfo(newName, newEmail) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this.mainHeaders(),
      body: JSON.stringify({
        name: newName,
        email: newEmail,
      })
    })
    .then(res => this.handleResponse(res));
  };

  // Card requests

  getUserMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: this.mainHeaders(),
    })
    .then(res => this.handleResponse(res));
  };

  likeCard(card) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this.mainHeaders(),
      body: JSON.stringify(card),
    })
    .then(res => this.handleResponse(res));
  };

  dislikeCard(cardId) {
    return fetch(`${this._url}/movies/${cardId}`, {
      method: 'DELETE',
      headers: this.mainHeaders(),
    })
    .then(res => this.handleResponse(res));
  };
};

const authApi = new Api({
  baseUrl: 'https://api.krasilnikov-artem.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
  }
});

const mainApi = new Api({
  baseUrl: 'https://api.krasilnikov-artem.nomoredomains.work',
});

export { authApi, mainApi };
