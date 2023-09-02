import { useNavigate } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {

  const navigate = useNavigate();


  function goBack() {
    navigate(-1);
  };



  return (
    <div className="not-found">

      <div className="not-found__container">

        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>

      </div>

      <button
        className="not-found__button"
        type="button"
        name="notFoundButton"
        onClick={ goBack }
      >
        Назад
      </button>

    </div>
  )
};

export default PageNotFound;
