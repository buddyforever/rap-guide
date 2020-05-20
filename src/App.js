import React, { useState } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from 'styled-components'

import Guide from './components/Guide/Guide'
import Layout from './components/Layout/Layout'
import AddGuide from './components/Guide/AddGuide'
import { About, Contact, Lessons, Login, PageNotFound, Request, Explore, Temp } from './components/Pages'
import LessonSignup from './components/Lesson/LessonSignup'
import PrivateRoute from './auth/PrivateRoute'
import Lesson from './components/Private/Lesson'
import AddLesson from './components/Lesson/AddLesson'
import EditLesson from './components/Lesson/EditLesson.js'
import Profile from './components/Private/Profile'
import auth from './auth/auth'
import { getLocalStorage } from './utilities/LocalStorage'
import { UserContext } from './context/UserContext'
import { defaultTheme } from '../src/components/themes/default'
import RouteChange from './utilities/RouteChange'

const GRAPHCMS_API =
  "https://api-euwest.graphcms.com/v1/ck56vnvt50t7301gifvv37btb/master";

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHCMS_API }),
  cache: new InMemoryCache()
});

function App() {
  const [user, setUser] = useState(auth.isAuthenticated() ? getLocalStorage("profile") : null);
  const [theme, setTheme] = useState(defaultTheme)

  async function getInfo() {
    let response = await fetch('http://localhost:8080/api', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json()
    return data;
  }
  getInfo().then(data => console.log(data));

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router>
          <RouteChange />
          <UserContext.Provider value={{ user, setUser }}>
            <Layout>
              <Switch>
                <Route exact path="/" component={Explore} />
                <Route path="/lessons" component={Lessons} />
                <Route path="/temp" component={Temp} />
                <Route path="/request" component={Request} />
                <Route path="/about" component={About} />
                <Route path="/login" component={Login} />
                <Route path="/contact" component={Contact} />
                <Route path="/guide/:id" component={Guide} />
                <Route path="/lesson/signup/:id" component={LessonSignup} />
                <PrivateRoute
                  path="/lesson/add/:id"
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

