import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const About = lazy(() => import('./pages/about'));
const CreateList = lazy(() => import('./pages/list/create'));
const EditList = lazy(() => import('./pages/list/edit'));
const AddListUnit = lazy(() => import('./pages/list/unit'));
const EditListUnit = lazy(() => import('./pages/list/edit-unit'));
const List = lazy(() => import('./pages/list'));
const Lists = lazy(() => import('./pages/lists'));
const Rules = lazy(() => import('./pages/rules'));
const Armies = lazy(() => import('./pages/rules/armies'));
const Army = lazy(() => import('./pages/rules/army'));
const CoreRules = lazy(() => import('./pages/rules/core'));
const SpecialRules = lazy(() => import('./pages/rules/special-rules'));
const Settings = lazy(() => import('./pages/settings'));
const NotFound = lazy(() => import('./pages/not-found'));
const Home = lazy(() => import('./pages/home'));

const AppRoutes = () => (
  <Routes>
    <Route path="/rules/:key" element={<SpecialRules />} />
    <Route path="/rules/core" element={<CoreRules />} />
    <Route path="/rules/armies/:key" element={<Army />} />
    <Route path="/rules/armies" element={<Armies />} />
    <Route path="/rules" element={<Rules />} />
    <Route path="/list/:key/edit" element={<EditList />} />
    <Route path="/list/:key/unit/:index" element={<EditListUnit />} />
    <Route path="/list/:key/unit" element={<AddListUnit />} />
    <Route path="/list/:key" element={<List />} />
    <Route path="/lists" element={<Lists />} />
    <Route path="/list" element={<CreateList />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/about" element={<About />} />
    <Route path="/" element={<Home />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
