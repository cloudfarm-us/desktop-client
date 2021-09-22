import { Center, ChakraProvider }                    from '@chakra-ui/react';
// import * as Sentry                                   from '@sentry/electron';
import { App }                                       from 'App';
import { Card, ErrorBoundary, SuspenseFallback }     from 'components';
import { render }                                    from 'react-dom';
import { StrictMode, Suspense }                      from 'react';
import { RecoilRoot }                                from 'recoil';
import { theme }                                     from 'theme';

// Sentry.init({ dsn: 'https://b68a61df2d29417eb5b3471bc337f386@o976609.ingest.sentry.io/5972741' });

render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <ErrorBoundary>
          <Suspense fallback={<SuspenseFallback />}>
            <Center h='100%' w='100%'>
              <Card>
                <App />
              </Card>
            </Center>
          </Suspense>
        </ErrorBoundary>
      </RecoilRoot>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('app'),
);
