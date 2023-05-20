import { Suspense } from 'react';
import { Loader } from '@fjlaubscher/matter';

// components
import Layout from './components/layout';

// helpers
import useAppMount from './data/use-app-mount';

import Routes from './routes';

const Router = () => {
  const { loading } = useAppMount();

  const fallback = (
    <Layout title="" isLoading>
      <Loader />
    </Layout>
  );
  return loading ? (
    fallback
  ) : (
    <Suspense fallback={fallback}>
      <Routes />
    </Suspense>
  );
};

export default Router;
