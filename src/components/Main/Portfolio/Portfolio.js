import { Link } from 'react-router-dom';

import './Portfolio.css';
import arrow from '../../../images/link-arrow.svg'

function Portfolio() {
  return (
    <article className="portfolio">
      <h3 className="portfolio__caption">Портфолио</h3>

      <Link
        className="portfolio__link"
        to="https://romnyer.github.io/how-to-learn/"
        target="_blank"
      >
        <p className="portfolio__text">Статичный сайт</p>
        <img className="portfolio__arrow" src={arrow} alt="Стрелка ссылки" />
      </Link>

      <Link
        className="portfolio__link"
        to="https://romnyer.github.io/russian-travel/"
        target="_blank"
      >
        <p className="portfolio__text">Адаптивный сайт</p>
        <img className="portfolio__arrow" src={arrow} alt="Стрелка ссылки" />
      </Link>

      <Link
        className="portfolio__link"
        to="https://romnyer.github.io/react-mesto-auth/"
        target="_blank"
      >
        <p className="portfolio__text">Одностраничное приложение</p>
        <img className="portfolio__arrow" src={arrow} alt="Стрелка ссылки" />
      </Link>
    </article>
  )
};

export default Portfolio;
