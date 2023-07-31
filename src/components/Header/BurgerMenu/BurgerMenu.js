import { Link, NavLink } from "react-router-dom";

import './BurgerMenu.css';

function BurgerMenu({ isBurger, handleBurgerMenu }) {

  const linksData = [
    {
      text: 'Главная',
      to: '/'
    },

    {
      text: 'Фильмы',
      to: 'movies'
    },

    {
      text: 'Сохранённые фильмы',
      to: '/saved-movies'
    }
  ];

  const burgerLinks = linksData.map((item, id) => (
    <li className="burger-menu__item" key={ id }>
      <NavLink
        className={({ isActive }) => `${ isActive ? "burger-menu__link burger-menu__link_active" : "burger-menu__link" }` }
        to={ item.to }
        onClick={handleBurgerMenu}
      >
        { item.text }
      </NavLink>
    </li>
  ))



  return (
    <div className={ `burger-menu ${ !isBurger ? "burger-menu burger-menu_hidden" : "" }` }>

        <div className={ `burger-menu__container ${ isBurger ? "burger-menu__container_active" : "" }` }>

          <button
            className="burger-menu__button"
            type="button"
            onClick={ handleBurgerMenu }
          />

          <ul className="burger-menu__list">
            { burgerLinks }
          </ul>

          <Link
            className="burger-menu__link burger-menu__profile-button"
            to="/profile"
            onClick={ handleBurgerMenu }
          >
            Аккаунт
          </Link>
        </div>

      </div>
  )
};

export default BurgerMenu;
