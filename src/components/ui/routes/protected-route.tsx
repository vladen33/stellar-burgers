import { ReactElement, useEffect } from 'react';
import { useSelector } from '../../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  element: ReactElement;
};

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const userData = useSelector((state) => state.user.userData);
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!userData || !isAuthChecked) {
      navigate('/login', {
        replace: true,
        state: { from: location }
      });
    }
  }, [userData]);
  if (!isAuthChecked) {
    //TODO Разобраться с прелоадером
    //return <Preloader />;
  }
  return element;
};
