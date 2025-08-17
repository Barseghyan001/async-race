import { useRoutes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.tsx';
import { lazy } from 'react';
import { Loadable } from './Loadable/Loadable.tsx';
import NotFound from '../pages/NotFound/NotFound.tsx';
import Home from '../pages/Home/Home.tsx';

const Winners = Loadable(lazy(() => import('../pages/Winners/Winners')));

const router = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'winners',
        element: <Winners />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const Router = () => {
  return <>{useRoutes(router)}</>;
};

export default Router;
