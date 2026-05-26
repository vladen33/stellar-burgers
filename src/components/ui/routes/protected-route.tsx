import React from 'react';
import { useSelector } from '../../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const userData = useSelector((state) => state.user.userData);
  const isLoading = useSelector((state) => state.user.loading);
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    if (!userData) {
      navigate('/login', {
        replace: true,
        state: { from: location }
      });
    }
  }, [navigate, userData]);
  console.log('isAuthChecked = ', isAuthChecked);
  if (!isAuthChecked) {
    return <Preloader />;
  }
  return children;
};
