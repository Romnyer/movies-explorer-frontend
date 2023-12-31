import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import './App.css';

import Header from '../Header/Header';
import AuthForm from '../AuthForm/AuthForm';
import Profile from '../Profile/Profile';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Popup from '../Popup/Popup';

import { useVisability } from '../../hooks/useVisability';
import { authApi, mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';

function App() {

  const [isLoggedIn, setLoggedIn] = useState(false),
        [checkedIn, setCheckedIn] = useState(false),
        [currentUser, setCurrentUser] = useState({}),
        [authFormPreloader, setAuthFormPreloader] = useState(false),
        [authFormError, setAuthFormError] = useState(''),
        [storedMovies, setStoredMovies] = useState([]),
        [submitProcess, setSubmitProcess] = useState(false),
        [isPopupOpened, setPopupOpened] = useState(false),
        [popupError, setPopupError] = useState(false);

  const navigate = useNavigate();
  const {
    headerVisability,
    footerVisability,
    basePath,
    signInUpPath
  } = useVisability();


  /* Handlers */


  function getUser() {
    mainApi.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
        setLoggedIn(true);
        setCheckedIn(true);
      })
      .catch((err) => {
        console.log(err.message);
        setCheckedIn(true);
      });
  };

  function getSavedMovies() {
    mainApi.getUserMovies()
      .then((movies) => {
        setStoredMovies(movies);
        localStorage.setItem('savedMovies', JSON.stringify(movies));
      })
      .catch((err) => console.log(err.message));
  };

  function handleAuthorization() {
    setLoggedIn(true);
    getSavedMovies();
    navigate('/movies', { replace: true });
  };

  function handleFullAuthorization() {
    getUser();
    handleAuthorization();
  };

  function handleAuthFormError(err) {
    console.log(err.message);
    setAuthFormError(err.status);
    setSubmitProcess(false);
  };

  function handleSignIn(email, password, handleAuth) {
    authApi.signIn(email, password)
      .then((jwt) => {
        localStorage.setItem('jwt', jwt.token);

        setSubmitProcess(false);
      })
      .then(() => handleAuth())
      .catch((err) => handleAuthFormError(err))
      .finally(() => setAuthFormPreloader(false));
  };

  function handleLogout() {
    setLoggedIn(false);
    setCurrentUser({ name: '', email: '' });
    localStorage.clear();
    navigate('/', { replace: true });
  };


  /* Submits */


  // Signup
  function signUp({ name, email, password }) {
    setAuthFormError(false);
    setAuthFormPreloader(true);
    setSubmitProcess(true);

    authApi.signUp({ name, email, password })
      .then((userData) => {
        setCurrentUser(userData);
        handleSignIn(email, password, handleAuthorization);

        setSubmitProcess(false);
      })
      .catch((err) => handleAuthFormError(err))
      .finally(() => setAuthFormPreloader(false));
  };

  // Signin
  function signIn({ email, password }) {
    setAuthFormError(false);
    setAuthFormPreloader(true);
    setSubmitProcess(true);

    handleSignIn(email, password, handleFullAuthorization);
  };


  /* Effects */


  // Check authorization for protected routes
  // Show the preloader while checking in
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      getUser();
      getSavedMovies();
    }
    else {
      setCheckedIn(true);
    };
  }, []);



  return (
    <CurrentUserContext.Provider value={ {
      currentUser,
      setCurrentUser,
      setPopupOpened,
      setPopupError
    } }>
      <SavedMoviesContext.Provider value={ {
        storedMovies,
        setStoredMovies,
        setPopupOpened,
        setPopupError
      } }>
        <div className="page">

          { headerVisability &&
            <Header
              isLoggedIn={ isLoggedIn }
              basePath={ basePath }
              signInUpPath={ signInUpPath }
            />
          }

          <Routes>
            <Route path="/" element={ <Main /> } />

            <Route
              path="sign-in"
              element={
                <ProtectedRoute
                loggedIn={ !isLoggedIn }
                checkedIn={ true }
                element={
                  <AuthForm
                    isSignIn={true}
                    handleSubmit={signIn}
                    preloader={authFormPreloader}
                    submitError={authFormError}
                    submitProcess={submitProcess}
                  />
                } />
              }
            />

            <Route
              path="sign-up"
              element={
                <ProtectedRoute
                loggedIn={ !isLoggedIn }
                checkedIn={ true }
                element={
                  <AuthForm
                    isSignIn={false}
                    handleSubmit={signUp}
                    preloader={authFormPreloader}
                    submitError={authFormError}
                    submitProcess={submitProcess}
                  />
                } />
              }
            />

            <Route
              path="profile"
              element={
                <ProtectedRoute
                  loggedIn={ isLoggedIn }
                  checkedIn={ checkedIn }
                  element={
                    <Profile handleLogout={handleLogout} />
                  }
                />
              }
            />


            <Route
              path="movies"
              element={
                <ProtectedRoute
                  loggedIn={ isLoggedIn }
                  checkedIn={ checkedIn }
                  element={
                    <Movies />
                  }
                />
              }
            />

            <Route
              path="saved-movies"
              element={
                <ProtectedRoute
                  loggedIn={ isLoggedIn }
                  checkedIn={ checkedIn }
                  element={
                    <SavedMovies />
                  }
                />
              }
            />

            <Route path="*" element={ <PageNotFound /> } />
          </Routes>

          { footerVisability && <Footer /> }

          <Popup
            isOpen={ isPopupOpened }
            setIsOpen={ setPopupOpened }
            submitError={ popupError }
          />
        </div>
      </SavedMoviesContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
