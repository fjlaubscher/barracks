import { GiBarracks } from 'react-icons/gi';
import { Alert } from '@fjlaubscher/matter';

// components
import AppLayout from '../../components/AppLayout';

import styles from './NotFound.module.scss';

const NotFound = () => (
  <AppLayout title="Not Found" description="The page you're looking for doesn't exist!">
    <Alert variant="error">The page you're looking for doesn't exist!</Alert>
    <div className={styles.content}>
      <GiBarracks className={styles.notFound} />
    </div>
  </AppLayout>
);

export default NotFound;
