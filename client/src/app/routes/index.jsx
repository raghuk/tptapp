import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Authentication from './auth/authentication';
import Authorization from './auth/authorization';

import Login from '../modules/login/index.jsx';
import Layout from '../modules/layout/index.jsx';
import Dashboard from '../modules/dashboard/index.jsx';
import FuelPrint from '../modules/fuel/index.jsx';
import About from '../modules/about/index.jsx';


const RoutePaths = () => {
  return (
    <Routes>
      <Route exact path='/login' element={<Login />} />

      <Route element={<Authentication><Layout /></Authentication>}>
        <Route exact path='/' element={<Dashboard />} />
        <Route exact path='/fuel' element={<FuelPrint />} />
        <Route exact path='/about' element={<About />} />
      </Route>
    </Routes>
  );
};

export default RoutePaths;
