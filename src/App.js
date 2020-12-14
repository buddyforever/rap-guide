import React, { useState, useEffect } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from 'styled-components'
import { useAuth0 } from "./react-auth0-spa";
import LogRocket from 'logrocket';

import Guide from './components/Guide/Guide'
import Layout from './components/Layout/Layout'
import { About, Contact, Lessons, Login, PageNotFound, Request, Explore, Temp, Home, AddGuide, Privacy, Feedback } from './components/Pages'
import UpdateLyrics from './TEMP/UpdateLyrics'
import LessonSignup from './components/Lesson/LessonSignup'
import PrivateRoute from './auth/PrivateRoute'
import Lesson from './components/Private/Lesson'
import Annotations from './components/Private/Annotations'
import AddLesson from './components/Lesson/AddLesson'
import AddLessonFromTemplate from './components/Lesson/AddLessonFromTemplate'
import EditLesson from './components/Lesson/EditLesson.js'
import { Profile } from './components/Private/Profile'
import Template from './components/Private/Template'
import TempPage from './TEMP/TempPage'
import Playlist from './components/Pages/Playlist'
import auth from './auth/auth'
import { UserContext } from './context/UserContext'
import { defaultTheme } from '../src/components/themes/default'
import RouteChange from './utilities/RouteChange'
import Loader from './components/Loader'

const GRAPHCMS_API =
  "https://api-euwest.graphcms.com/v1/ck56vnvt50t7301gifvv37btb/master";

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHCMS_API }),
  cache: new InMemoryCache()
});

function App() {

  const { loading, isAuthenticated, user: profile } = useAuth0();

  const [user, setUser] = useState(isAuthenticated ? profile : null);
  const [theme, setTheme] = useState(defaultTheme)

  LogRocket.init('kpneaw/rap-guide');

  if (loading) return <Loader />
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router>
          <RouteChange />
          <UserContext.Provider value={{ user, setUser }}>
            <Layout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/explore" component={Explore} />
                <Route path="/lessons" component={Lessons} />
                <Route path="/temp" component={Temp} />
                <Route path="/addguide" component={AddGuide} />
                <Route path="/updatelyrics" component={UpdateLyrics} />
                <Route path="/request" component={Request} />
                <Route path="/about" component={About} />
                <Route path="/login" component={Login} />
                <Route path="/contact" component={Contact} />
                <Route path="/feedback" component={Feedback} />
                <Route path="/privacy" component={Privacy} />
                <Route path="/guide/:slug" component={Guide} />
                <Route path="/playlist/:slug" component={Playlist} />
                <Route path="/lesson/signup/:id" component={LessonSignup} />
                <PrivateRoute
                  path="/lesson/add/template/:id"
                  component={AddLessonFromTemplate}
                  authenticationPath="/login"
                  isAuthenticated={auth.isAuthenticated()}
                  isAllowed={auth.isAuthenticated()}
                  restrictedPath="/404" />
                <PrivateRoute
                  path="/lesson/add/:slug"
                  component={AddLesson}
                  authenticationPath="/login"
                  isAuthenticated={auth.isAuthenticated()}
                  isAllowed={auth.isAuthenticated()}
                  restrictedPath="/404" />
                <PrivateRoute
                  path="/lesson/edit/:id/:page"
                  component={EditLesson}
                  authenticationPath="/login"
                  isAuthenticated={auth.isAuthenticated()}
                  isAllowed={auth.isAuthenticated()}
                  restrictedPath="/404" />
                <PrivateRoute
                  path="/lesson/edit/:id"
                  component={EditLesson}
                  authenticationPath="/login"
                  isAuthenticated={auth.isAuthenticated()}
                  isAllowed={auth.isAuthenticated()}
                  restrictedPath="/404" />
                <PrivateRoute
                  path="/lesson/:id"
                  component={Lesson}
                  authenticationPath="/login"
                  isAuthenticated={auth.isAuthenticated()}
                  isAllowed={auth.isAuthenticated()}
                  restrictedPath="/404" />
                <PrivateRoute
                  path="/template/:id"
                  component={Template}
                  authenticationPath="/login"
                  isAuthenticated={auth.isAuthenticated()}
                  isAllowed={auth.isAuthenticated()}
                  restrictedPath="/404" />
                <PrivateRoute
                  path="/annotations/:id"
                  component={Annotations}
                  authenticationPath="/annotations"
                  isAuthenticated={auth.isAuthenticated()}
                  isAllowed={auth.isAuthenticated()}
                  restrictedPath="/404" />
                <PrivateRoute
                  path="/profile"
                  component={Profile}
                  authenticationPath="/login"
                  isAuthenticated={auth.isAuthenticated()}
                  isAllowed={auth.isAuthenticated()}
                  restrictedPath="/404"
                />
                <PrivateRoute
                  path="/addguide"
                  component={AddGuide}
                  authenticationPath="/login"
                  isAuthenticated={auth.isAuthenticated()}
                  isAllowed={auth.isAuthenticated()}
                  restrictedPath="/404"
                />
                <Route component={PageNotFound} />
              </Switch>
            </Layout>
          </UserContext.Provider>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;

