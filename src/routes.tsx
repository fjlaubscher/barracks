import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Armies = lazy(() => import('./pages/armies'));
const Army = lazy(() => import('./pages/army'));
const CreateList = lazy(() => import('./pages/list/create'));
const EditList = lazy(() => import('./pages/list/edit'));
const AddListUnit = lazy(() => import('./pages/list/unit'));
const EditListUnit = lazy(() => import('./pages/list/edit-unit'));
const List = lazy(() => import('./pages/list'));
const Rules = lazy(() => import('./pages/rules'));
const QuickReferenceRules = lazy(() => import('./pages/rules/quick-reference'));
const SpecialRules = lazy(() => import('./pages/rules/special-rules'));
const Home = lazy(() => import('./pages/home'));
const NotFound = lazy(() => import('./pages/not-found'));
const Settings = lazy(() => import('./pages/settings'));

const AppRoutes = () => (
  <Routes>
    <Route path="/rules/:key" element={<SpecialRules />} />
    <Route path="/rules/quick-reference" element={<QuickReferenceRules />} />
    <Route path="/rules" element={<Rules />} />
    <Route path="/list/:key/edit" element={<EditList />} />
    <Route path="/list/:key/unit/:index" element={<EditListUnit />} />
    <Route path="/list/:key/unit" element={<AddListUnit />} />
    <Route path="/list/:key" element={<List />} />
    <Route path="/list" element={<CreateList />} />
    <Route path="/army/:key" element={<Army />} />
    <Route path="/armies" element={<Armies />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/" element={<Home />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
