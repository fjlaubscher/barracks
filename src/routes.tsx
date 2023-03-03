import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Army = lazy(() => import('./pages/army'));
const Home = lazy(() => import('./pages/home'));
const NotFound = lazy(() => import('./pages/not-found'));

const AppRoutes = () => (
  <Routes>
    <Route path="/army/:key" element={<Army />} />
    <Route path="/" element={<Home />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
