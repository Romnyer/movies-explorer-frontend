// Shows films duration in card
function calcDuration(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  let result = `${ hours }ч${ minutes }м`;

  if (hours === 0) {
    result = `${ minutes }м`
  };

  if (minutes === 0) {
    result = `${ hours }ч`
  };

  return result;
};

// Set number of visible cards depending on width of window
function moviesNumber(handler, time = 500) {
  const windowWidth = window.innerWidth;
  let moviesNumber = 12;

  if (windowWidth < 769) {
    moviesNumber = 8;
  };

  if (windowWidth < 481) {
    moviesNumber = 5;
  };

  setTimeout(() => {
    handler(moviesNumber);
  }, time);
};

// Search films by request
function searchFilm(film, request) {
  return film.includes(request);
};

function searchFilms(film, request, isShort = false) {
  const requestText = request.toLowerCase();
  const filmText = film.nameRU.toLowerCase();

  if (isShort) {
    if (film.duration <= 40) {
      return searchFilm(filmText, requestText);
    }

    else {
      return false;
    }
  }

  return searchFilm(filmText, requestText);
};

/* Set custom text for validation error */

function setCustomValidError(evt, pattern, customText) {
  const patternMatch = evt.target.value.match(pattern);
  const patternMatchResult = patternMatch !== null ? patternMatch[0] : '';

  if (evt.target.value !== patternMatchResult) {
    evt.target.setCustomValidity(customText);
  }
  else {
    evt.target.setCustomValidity('');
  };
};

// Set custom name validation error
function setCustomNameValidError(evt) {
  const namePattern = /[(a-zа-яё)+\s\-]+/i;
  const errorText = 'Поле должно содержать только латиницу, кириллицу, пробел или дефис.';

  setCustomValidError(evt, namePattern, errorText);
};

// Set custom email validation error
function setCustomEmailValidError(evt) {
  const namePattern = /[a-z0-9]+[\_\-\.]*@[a-z]+\.{1,1}[a-z]{2,}/i;
  const errorText = 'До знака @ допустимы латиница, цифры, точка, _ и -';

  setCustomValidError(evt, namePattern, errorText);
};

/* Set submit error text */
function setErrorText(code) {
  if (code === 400) {
    return 'Переданы некорректные данные.';
  };
  if (code === 401) {
    return 'Вы ввели неправильный логин или пароль.';
  };
  if (code === 409) {
    return 'Пользователь с таким email уже существует.';
  };
  if (code === 500) {
    return 'На сервере произошла ошибка.';
  };
  return '';
}

export {
  calcDuration,
  moviesNumber,
  searchFilms,
  setCustomNameValidError,
  setCustomEmailValidError,
  setErrorText
};
