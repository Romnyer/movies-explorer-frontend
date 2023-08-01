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

  // 404 page
  const notFoundPath = basePath || signInUpPath || profilePath;


  if (!notFoundPath) {
    headerVisability = false;
    footerVisability = false;
  };

  if (signInUpPath || profilePath) {
    footerVisability = false;
  }



  return {
    headerVisability,
    footerVisability,
    basePath,
    signInUpPath
  };
}
