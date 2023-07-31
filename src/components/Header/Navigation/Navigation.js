import { Link, NavLink } from "react-router-dom";

import './Navigation.css';

function Navigation({ isLoggedIn, handleBurgerMenu }) {

  return (
    <nav className="navigation">

      { isLoggedIn && (
        <>
          <button
            className="navigation__burger-button"
            type="button"
            onClick={ handleBurgerMenu }
          />

          <NavLink
            className={
              ({ isActive }) => `
                navigation__link navigation__link_for_login
                ${ isActive ? "navigation__link_for_current" : "" }
              `
            }
            to="/movies"
          >
            Фильмы
          </NavLink>
        </>
      )}

      <NavLink
        className={
          ({ isActive }) => `
            navigation__link ${ isLoggedIn ? "navigation__link_for_login" : "" }
            ${ isActive ? "navigation__link_for_current" : "" }
          `
        }
        to={ isLoggedIn ? "/saved-movies" : "/sign-up" }
      >
        { isLoggedIn ? 'Сохранённые фильмы' : 'Регистрация' }
      </NavLink>

      <Link
        className={`
          navigation__link navigation__link_for_active
          ${ isLoggedIn ? "navigation__link_for_login" : "navigation__link_for_auth" }
        `}
        to={ isLoggedIn ? "/profile" : "/sign-in" }
      >
        { isLoggedIn ? 'Аккаунт' : 'Войти' }
      </Link>

    </nav>
  )
};

export default Navigation;
