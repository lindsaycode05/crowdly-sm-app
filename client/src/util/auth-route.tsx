import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth';

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AuthContext);
  let location = useLocation();

  if (user) {
    return <Navigate to='/' state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default AuthRoute;
