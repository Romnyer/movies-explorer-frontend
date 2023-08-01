import './Main.css';

import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';

function Main() {

  const titleClass = 'main__subtitle';


  return (
    <main className="main">

      <Promo />

      <NavTab />

      <AboutProject titleClass={ titleClass } />

      <Techs titleClass={ titleClass } />

      <AboutMe titleClass={ titleClass } />

      <Portfolio />

    </main>
  )
};

export default Main;
