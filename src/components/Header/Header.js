import { useState } from 'react';

import './Header.css';

import Navigation from './Navigation/Navigation';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import Logo from '../Logo/Logo';

function Header({ isLoggedIn, basePath, signInUpPath }) {

  const [isBurger, setBurger] = useState(false);

  // Open/close burger menu
  function handleBurgerMenu() {
    setBurger(!isBurger);
  }



  return (
    <header
      className="header"
      style={{
        background: !basePath && '#202020'
      }}
    >

      <div className="header__menu">

        <Logo />

        { /* Hide navigation on sign-in or sign-up paths */ }

        {!signInUpPath &&
          <Navigation
            isLoggedIn={ isLoggedIn }
            handleBurgerMenu={ handleBurgerMenu }
          />
        }

      </div>

      { /* Burger menu popup */ }

      <BurgerMenu
        isBurger={ isBurger }
        handleBurgerMenu={ handleBurgerMenu }
      />

    </header>
  );
}

export default Header;
