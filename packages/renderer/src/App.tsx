import { useDisclosure }                                                            from '@chakra-ui/react';
import { FloatingButtonGroup, PrivateOnlyRoute, PublicOnlyRoute, SuspenseFallback } from 'components';
import { useUserState }                                                             from 'models/User';
import { MemoryRouter as Router, Switch }                                           from 'react-router-dom';
import { lazy, Suspense }                                                           from 'react';
import { MACHINEID }                                                                from 'services/Electron';

const LinkedView = lazy(async () => import('pages/Linked'));
const LoginView = lazy(async () => import('pages/Login'));
const ResetPasswordView = lazy(async () => import('pages/ResetPassword'));
const UnlinkedView = lazy(async () => import('pages/Unlinked'));
const SettingsModal = lazy(async () => import('pages/SettingsModal'));

const Routes = (): JSX.Element => {
  const user = useUserState();
  const isSignedIn = Boolean(user);
  const linked = user && MACHINEID in user.rigs;

  return (
    <Router>
      <Suspense fallback={<SuspenseFallback />}>
        <Switch>
          <PrivateOnlyRoute exact path='/unlinked' isAuthenticated={isSignedIn} redirectTo='/login' render={() => <UnlinkedView/>} />
          <PublicOnlyRoute exact path='/reset-password' redirectTo={linked ? '/linked' : '/unlinked'} isAuthenticated={isSignedIn}  render={() => <ResetPasswordView />} />
          <PrivateOnlyRoute exact path='/linked'isAuthenticated={isSignedIn} redirectTo='/login' render={() => <LinkedView/>} />
          <PublicOnlyRoute path='/' redirectTo={linked ? '/linked' : '/unlinked'} isAuthenticated={isSignedIn} render={() => <LoginView />}/>
        </Switch>
      </Suspense>
    </Router>
  );
};

const App = (): JSX.Element => {
  const {
    isOpen: isSettingsOpen,
    onOpen: onOpenSettings,
    onClose: onSettingsClose,
  } = useDisclosure();

  return (
    <>
      <FloatingButtonGroup onOpenSettings={onOpenSettings} />
      <SettingsModal isOpen={isSettingsOpen} onClose={onSettingsClose} />
      <Routes />
    </>
  );
};

export { App };
