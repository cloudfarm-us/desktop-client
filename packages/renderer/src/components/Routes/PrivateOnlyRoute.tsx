import { Redirect,
  Route,
  RouteComponentProps,
  RouteProps } from 'react-router-dom';

interface CustomRouteProps extends RouteProps {
  isAuthenticated: boolean;
  redirectTo: string | undefined;
}

export const PrivateOnlyRoute = ({
  component: Component,
  render,
  isAuthenticated,
  redirectTo,
  ...rest
}: CustomRouteProps) => {
  if (Component) {
    return (
      <Route
        {...rest}
        render={(props: RouteComponentProps) => (isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname : redirectTo,
                state    : {
                  from : props.location,
                },
              }}
            />
        ))
        }
      />
    );
  }

  if (isAuthenticated)  return <Route {...rest} render={render} />;

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
};
