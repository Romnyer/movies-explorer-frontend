import { Link } from 'react-router-dom';

import './AboutMe.css';

import avatar from '../../../images/avatar.jpg';

function AboutMe({ titleClass }) {
  return (
    <>
      <h3 className={ `main__subtitle_for_me ${ titleClass }` } id="student">Студент</h3>

      <article className="about-me">

        <section className="about-me__container">
          <div className="about-me__summary">
            <h3 className="about-me__title">Артём</h3>
            <p className="about-me__info">
              Веб-разработчик, 26 лет
            </p>
            <p className="about-me__text">
              Я работаю 3D-визуализатором на мебельной фабрике в Нижнем Новгороде, а
              также администрирую сайт компании. Решая задачи по сайту, понял, что разработка –
              это профессия не только для избранных.<br />
              Я закончил курс веб-разработки и сейчас активно ищу работу.
              У меня есть инженерное образование и опыт работы в других сферах, что помогает
              войти в новую профессию.
            </p>
          </div>

          <Link
            className="about-me__link"
            to="https://github.com/Romnyer"
            target="_blank"
          >
            Github
          </Link>
        </section>

        <img className="about-me__avatar" src={ avatar } alt="Фото студента" />


      </article>
    </>
  )
};

export default AboutMe;
