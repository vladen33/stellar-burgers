import { ReactElement, useEffect } from 'react';
import { useSelector } from '../../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
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
  }, [navigate, userData]);
  console.log('isAuthChecked = ', isAuthChecked);
  if (!isAuthChecked) {
    //TODO Разобраться с прелоадером
    // return <Preloader />;
  }
  return children;
};
