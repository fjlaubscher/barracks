import { Suspense } from 'react';
import { Loader } from '@fjlaubscher/matter';

// components
import AppLayout from './components/AppLayout';

import Routes from './routes';

const App = () => {
  const fallback = (
    <AppLayout title="" isLoading>
      <Loader />
    </AppLayout>
  );

  return (
    <Suspense fallback={fallback}>
      <Routes />
    </Suspense>
  );
};

export default App;
