import { Link } from "react-router-dom";

import './Logo.css';
import logo from '../../images/logo.svg';

function Logo({ classForAuth }) {
  return (
    <div className={`logo ${ classForAuth ? "logo_for_auth" : "" }` }>
      <Link className="logo__link" to="/">
        <img
          className="logo__pic"
          src={logo}
          alt="Логотип"
        />
      </Link>
    </div>
  )
};

export default Logo;
