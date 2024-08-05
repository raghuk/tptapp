import React, { createContext, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const redirectPath = location.state?.path || '/';

  const [authUser, setAuthUser] = useState({ user: null, permissions: [] });


  const loginUser = (user, roles) => {
    setAuthUser({ user: user, permissions: roles });
    navigate(redirectPath, { replace: true });
  };


  const logoutUser = () => {
    setAuthUser({ user: null, permissions: [] });
    navigate('/login');
  };

  return <AuthContext.Provider value={{ authUser, loginUser, logoutUser }}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  return useContext(AuthContext);
};
