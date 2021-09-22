import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import { ErrorFallback }                       from './ErrorFallback';

export const ErrorBoundary = ({ children }: { children: JSX.Element }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};
