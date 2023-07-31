import { useLocation } from 'react-router-dom';

export function useVisability() {

  const { pathname } = useLocation();
  let headerVisability = true;
  let footerVisability = true;


  // Different header bg color for "/" path
  const basePath = pathname === '/';

  // Hide navigation for "/sign-in" or "/sign-up" paths
  // And footer for "/profile" path
  const signInUpPath = pathname === '/sign-in' || pathname === '/sign-up';
  const profilePath = pathname === '/profile';
  const moviesPath = pathname === '/movies';
  const savedMoviesPath = pathname === '/saved-movies';

  // 404 page
  const notFoundPath = basePath || signInUpPath || profilePath || moviesPath || savedMoviesPath;


  if (!notFoundPath) {
    headerVisability = false;
    footerVisability = false;
  }

  if (signInUpPath) {
    headerVisability = false;
    footerVisability = false;
  };

  if (profilePath ) {
    footerVisability = false;
  }



  return {
    headerVisability,
    footerVisability,
    basePath,
    signInUpPath
  };
}
