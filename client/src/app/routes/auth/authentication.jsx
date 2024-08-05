import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { isEmpty } from 'lodash-es';

import { useAuth } from './authProvider';


const Authentication = ({ children }) => {
    const { authUser } = useAuth();
    const location = useLocation();

    if (isEmpty(authUser.user)) {
      return (
        <Navigate to="/login" state={{ path: location.pathname }} />
      );
    }

    return children;
};

export default Authentication;
