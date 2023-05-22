import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Alert, Stack } from '@fjlaubscher/matter';

// components
import Layout from '../layout';

import styles from './error-boundary.module.scss';

type Props = {
  children: ReactNode;
};
type State = { hasError: boolean; error?: Error; errorInfo?: ErrorInfo };

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: undefined, errorInfo: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ error, errorInfo: info });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Layout title="Error">
          <Stack direction="column">
            <Alert className={styles.alert} variant="error">
              <p>Please refresh the page and try again.</p>
              <p>
                If the error persists, help me solve it by creating a{' '}
                <a
                  href="https://github.com/fjlaubscher/barracks/issues/new?assignees=&labels=&projects=&template=bug_report.md&title="
                  target="_blank"
                >
                  bug report.
                </a>
              </p>
            </Alert>
            <h4 className={styles.title}>{this.state.error?.message || 'Generic Error'}</h4>
            <code className={styles.code}>{this.state.errorInfo?.componentStack}</code>
          </Stack>
        </Layout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
