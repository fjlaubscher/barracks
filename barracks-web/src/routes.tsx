import { lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

const About = lazy(() => import('./pages/About'));
const CreateList = lazy(() => import('./pages/CreateList'));
const EditList = lazy(() => import('./pages/EditList'));
const AddListUnit = lazy(() => import('./pages/CreateListUnit'));
const EditListUnit = lazy(() => import('./pages/EditListUnit'));
const List = lazy(() => import('./pages/List'));
const Lists = lazy(() => import('./pages/Lists'));
const PrintList = lazy(() => import('./pages/PrintList'));
const Rules = lazy(() => import('./pages/Rules'));
const Armies = lazy(() => import('./pages/Armies'));
const Army = lazy(() => import('./pages/Army'));
const CoreRules = lazy(() => import('./pages/CoreRules'));
const SpecialRules = lazy(() => import('./pages/SpecialRules'));
const Settings = lazy(() => import('./pages/settings'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Home = lazy(() => import('./pages/Home'));

const AppRoutes = () => {
  const location = useLocation();
  const [deferredLocation, setDeferredLocation] = useState(location);

  useEffect(() => {
    if (!location.hash) {
      // this hack enables the View Transition API with React Router 6
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          setDeferredLocation(location);
          window.scrollTo(0, 0);
        });
      } else {
        setDeferredLocation(location);
        window.scrollTo(0, 0);
      }
    } else {
      // scroll to a specific element on the page, don't scroll to top
      setDeferredLocation(location);
    }
  }, [location, setDeferredLocation]);

  return (
    <Routes location={deferredLocation}>
      <Route path="/rules/:key" element={<SpecialRules />} />
      <Route path="/rules/core" element={<CoreRules />} />
      <Route path="/rules/armies/:key" element={<Army />} />
      <Route path="/rules/armies" element={<Armies />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/list/:key/edit" element={<EditList />} />
      <Route path="/list/:key/unit/:index" element={<EditListUnit />} />
      <Route path="/list/:key/unit" element={<AddListUnit />} />
      <Route path="/list/:key/print" element={<PrintList />} />
      <Route path="/list/:key" element={<List />} />
      <Route path="/lists" element={<Lists />} />
      <Route path="/list" element={<CreateList />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
