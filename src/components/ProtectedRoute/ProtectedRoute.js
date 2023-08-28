import React from "react";
import { Navigate } from "react-router-dom";

import Preloader from "../MoviesCardList/Preloader/Preloader";

function ProtectedRoute ({ loggedIn, checkedIn, element }) {
  return (
    <>
      { checkedIn ?
        loggedIn ? element : <Navigate to="/sign-in" replace />
        :
        <Preloader />
      }
    </>
  )
};

export default ProtectedRoute;
