import './Techs.css';

function Techs({ titleClass }) {
  return (
    <article className="techs">

      <h3 className={ `main__subtitle_for_tech ${ titleClass }` } id="technologies">Технологии</h3>

      <div className="techs__container">
        <h2 className="techs__banner">7 технологий</h2>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии,
          которые применили в дипломном проекте.
        </p>
      </div>

      <ul className="techs__list">
        <li className="techs__item">HTML</li>
        <li className="techs__item">CSS</li>
        <li className="techs__item">JS</li>
        <li className="techs__item">React</li>
        <li className="techs__item">Git</li>
        <li className="techs__item">Express.js</li>
        <li className="techs__item">mongoDB</li>
      </ul>
    </article>
  )
};

export default Techs;
