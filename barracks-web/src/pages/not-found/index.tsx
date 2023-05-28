import { GiBarracks } from 'react-icons/gi';
import { Alert } from '@fjlaubscher/matter';

// components
import Layout from '../../components/layout';

import styles from './not-found.module.scss';

const NotFound = () => (
  <Layout title="Not Found" description="The page you're looking for doesn't exist!">
    <Alert variant="error">The page you're looking for doesn't exist!</Alert>
    <div className={styles.content}>
      <GiBarracks className={styles.notFound} />
    </div>
  </Layout>
);

export default NotFound;
