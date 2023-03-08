import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Armies = lazy(() => import('./pages/armies'));
const Army = lazy(() => import('./pages/army'));
const CreateList = lazy(() => import('./pages/list/create'));
const EditList = lazy(() => import('./pages/list/edit'));
const AddListUnit = lazy(() => import('./pages/list/unit'));
const List = lazy(() => import('./pages/list'));
const Lists = lazy(() => import('./pages/lists'));
const Home = lazy(() => import('./pages/home'));
const NotFound = lazy(() => import('./pages/not-found'));

const AppRoutes = () => (
  <Routes>
    <Route path="/lists" element={<Lists />} />
    <Route path="/list/:key/edit" element={<EditList />} />
    <Route path="/list/:key/unit" element={<AddListUnit />} />
    <Route path="/list/:key" element={<List />} />
    <Route path="/list" element={<CreateList />} />
    <Route path="/army/:key" element={<Army />} />
    <Route path="/armies" element={<Armies />} />
    <Route path="/" element={<Home />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
