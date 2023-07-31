import './AboutProject.css';

function AboutProject({ titleClass }) {
  return (
    <article className="about-project">

      <h3 className="main__subtitle" id="project">О проекте</h3>

      <section className="about-project__info">
        <div className="about-project__container">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные
            доработки.
          </p>
        </div>

        <div className="about-project__container">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно
            защититься.
          </p>
        </div>
      </section>

      <section className="about-project__timeline">
        <div className="about-project__box about-project__box_color_light">1 неделя</div>
        <div className="about-project__box about-project__box_color_dark">4 недели</div>
        <div className="about-project__box about-project__box_color_empty">Back-end</div>
        <div className="about-project__box about-project__box_color_empty">Front-end</div>
      </section>
    </article>
  )
};

export default AboutProject;
