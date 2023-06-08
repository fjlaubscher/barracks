import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Alert, Stack } from '@fjlaubscher/matter';

// components
import Layout from '../layout';

import styles from './error-boundary.module.scss';

type Props = {
  children: ReactNode;
};
type State = { error?: Error; errorInfo?: ErrorInfo };

const SILENCED_ERRORS = ['EasySpeech: not initialized. Run EasySpeech.init() first'];

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    if (!SILENCED_ERRORS.includes(error.message)) {
      // Update state so the next render will show the fallback UI.
      return { error };
    }

    return {};
  }

  render() {
    if (this.state.error) {
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
            <h4 className={styles.title}>{this.state.error.message || 'Generic Error'}</h4>
            <code className={styles.code}>{this.state.errorInfo?.componentStack}</code>
          </Stack>
        </Layout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
