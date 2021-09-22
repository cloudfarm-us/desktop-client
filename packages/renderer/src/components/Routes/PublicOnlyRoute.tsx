import { Redirect,
  Route,
  RouteComponentProps,
  RouteProps } from 'react-router-dom';

interface CustomRouteProps extends RouteProps {
  isAuthenticated: boolean;
  redirectTo: string | undefined;
}

export const PublicOnlyRoute = ({
  render,
  component: Component,
  isAuthenticated,
  redirectTo,
  ...rest
}: CustomRouteProps) => {
  if (Component) {
    return (
      <Route
        {...rest}
        render={(props) => (isAuthenticated ? (
            <Redirect to={{
              pathname : redirectTo,
            }} />
        ) : (
            <Component {...props} />
        ))
        }
      />
    );
  }

  if (isAuthenticated) {
    return (
      <Route
        {...rest}
        render={(props: RouteComponentProps) => (
          <Redirect
            to={{
              pathname : redirectTo,
              state    : {
                from : props.location,
              },
            }}
          />
        )}
      />
    );
  }

  return <Route {...rest} render={render} />;
};
