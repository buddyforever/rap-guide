import * as React from 'react';
import { Redirect, Route } from 'react-router';

export const PrivateRoute = (props) => {
  let redirectPath = '';
  if (!props.isAuthenticated) {
    redirectPath = props.authenticationPath;
  }
  if (props.isAuthenticated && !props.isAllowed) {
    redirectPath = props.restrictedPath;
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};

export default PrivateRoute;