import React from 'react';
import { useSelector } from '../../../services/store';
import { Navigate } from 'react-router';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  const userData = useSelector((state) => state.user.userData);
  if (!userData) {
    return (<Navigate to='/login' state={{ from: location }} replace />);
  }
  return children;
};
