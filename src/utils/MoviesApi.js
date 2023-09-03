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
      .then((err) => Promise.reject(err.message));
  }

  //Get movies
  getMovies() {
    return fetch(this._url, {
      headers: this._headers
    })
    .then(res => this.handleResponse(res));
  }
}

const moviesApi = new Api({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  }
})

export default moviesApi;
