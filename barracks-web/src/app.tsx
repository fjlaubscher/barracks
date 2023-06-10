import { Suspense } from 'react';
import { Loader } from '@fjlaubscher/matter';

// components
import Layout from './components/layout';

import Routes from './routes';

const App = () => {
  const fallback = (
    <Layout title="" isLoading>
      <Loader />
    </Layout>
  );

  return (
    <Suspense fallback={fallback}>
      <Routes />
    </Suspense>
  );
};

export default App;
