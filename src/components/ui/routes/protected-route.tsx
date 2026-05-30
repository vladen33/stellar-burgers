import { ReactElement, useEffect } from 'react';
import { useSelector } from '../../../services/store';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';
import { getIsAuthCheckedSelector, getUserDataSelector } from '@selectors';

type ProtectedRouteProps = {
  element: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  element,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const userData = useSelector(getUserDataSelector);
  const isAuthChecked = useSelector(getIsAuthCheckedSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    //TODO Разобраться с прелоадером
    return <Preloader />;
  }

  if (onlyUnAuth && userData) {
    const from = (location.state as { from?: Location })?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !userData) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return element;
};
