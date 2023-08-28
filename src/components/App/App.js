import { useEffect, useState } from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import { useVisability } from '../../hooks/useVisability';

import './App.css';

import Header from '../Header/Header';
import Auth from '../AuthForm/AuthForm';
import Profile from '../Profile/Profile';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';

import { cardsData } from '../../constants/constants';

function App() {

  const [isLoggedIn, setLoggedIn] = useState(false),
        [cards, setCards] = useState([]),
        [savedCards, setSavedCards] = useState([]);

  const navigate = useNavigate();
  const {
    headerVisability,
    footerVisability,
    basePath,
    signInUpPath
  } = useVisability();


  useEffect(() => {
    setTimeout(() => {
      setCards(cardsData);
    }, 1000);
  }, [isLoggedIn]);

  useEffect(() => {
    setSavedCards(cards.filter((c) => c.saved === true));
  }, [cards]);


  /* Handlers */


  // Handle login
  function handleLoggedIn() {
    setLoggedIn(true);
    navigate('/', { replace: true })
  };

  // Handle logout
  function handleLogout() {
    setLoggedIn(false);
    navigate('/', { replace: true })
  };

  // Handle card delete
  function handleCardDelete(id) {
    setSavedCards((state) => state.filter((c) => c._id !== id));
  };



  return (
    <div className="page">

      { headerVisability &&
        <Header
          isLoggedIn={ isLoggedIn }
          basePath={ basePath }
          signInUpPath={ signInUpPath }
        />
      }

      <Routes>
        <Route path="/" element={ <Main /> }/>
        <Route path="sign-in" element={ <Auth isSignIn={true} handleLoggedIn={handleLoggedIn} /> } />
        <Route path="sign-up" element={ <Auth isSignIn={false} /> } />
        <Route path="profile" element={ <Profile
          handleLogout={handleLogout}
          profileName='Пользователь'
          profileEmail='email@ya.ru'
          />
          }
        />
        <Route path="movies" element={ <Movies cards={ cards } /> } />
        <Route path="saved-movies" element={
          <SavedMovies
            savedCards={ savedCards }
            handleCardDelete={ handleCardDelete }
          />
          }
        />
        <Route path="*" element={ <PageNotFound /> } />
      </Routes>

      { footerVisability && <Footer /> }
    </div>
  );
}

export default App;
