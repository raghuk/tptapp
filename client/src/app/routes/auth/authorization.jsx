import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

import { isEmpty } from 'lodash-es';

import { useAuth } from './authProvider';


const Unauthorized = () => {
  return <div className='app-unauth'>You do not have permission to view this page.</div>;
};

const Authorization = ({ permissions }) => {
  const { authUser } = useAuth();
  const location = useLocation();

  if (!isEmpty(authUser)) {
    const userPermissions = authUser.permissions;
    const isAllowed = permissions.some((allowed) => userPermissions.includes(allowed));

    return isAllowed ? <Outlet /> : <Unauthorized />;
  }

  return <Navigate to='/login' state={{ path: location.pathname }} replace />;
};

export default Authorization;
