import React, { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth0 } from "../react-auth0-spa";

import { UserContext } from '../context/UserContext'

export const PrivateRoute = (props) => {

  /* Authentication */
  const { loading, user: profile, isAuthenticated, loginWithRedirect } = useAuth0();

  /* Context */
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    // Load Profile
    if (isAuthenticated && !user) {
      setUser(profile);
    }
  }, [profile]);

  if (loading) return null;

  let redirectPath = '';
  if (!isAuthenticated) {
    loginWithRedirect();
  }
  if (isAuthenticated && !props.isAllowed) {
    redirectPath = props.restrictedPath;
  }
  redirectPath = null;

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};

export default PrivateRoute;