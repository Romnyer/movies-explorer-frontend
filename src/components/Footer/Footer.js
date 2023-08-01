import { Link } from 'react-router-dom';

import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>

      <section className="footer__container">
        <ul className="footer__list">
          <li className="footer__item">
            <Link
              className="footer__link"
              to="https://practicum.yandex.ru"
              target="_blank"
            >
              Яндекс.Практикум
            </Link>
          </li>

          <li className="footer__item">
            <Link
              className="footer__link"
              to="https://github.com/Romnyer"
              target="_blank"
            >
              Github
            </Link>
          </li>
        </ul>

        <p className="footer__text">&copy; { (new Date()).getFullYear() }</p>
      </section>
    </footer>
  )
};

export default Footer;
