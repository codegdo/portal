import React from 'react';
import { BrowserRouter, Navigate } from 'react-router-dom';
import { AppRoute } from './app.route';
//import { Display } from './components/element';
//import { usePreload } from './hooks/use-preload.hook';

export const App: React.FC = (): JSX.Element | null => {

  //const { preload, sessionTimeout } = usePreload();

  return <BrowserRouter>
    <AppRoute />
  </BrowserRouter>
};
