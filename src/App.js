import React, { useEffect, useState } from 'react'
import Layout from './components/Layout/Layout'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import About from './components/Pages/About'
import Guide from './components/Guide/Guide'
import AddGuide from './components/Guide/AddGuide'
import RapGuides from './components/Pages/RapGuides'
import Lessons from './components/Pages/Lessons'
import Request from './components/Pages/Request'
import Contact from './components/Pages/Contact'
import Login from './components/Pages/Login'
import LessonSignup from './components/Lesson/LessonSignup'
import PrivateRoute from './auth/PrivateRoute'
import PageNotFound from './components/Pages/PageNotFound'
import Lesson from './components/Private/Lesson'
import AddLesson from './components/Lesson/AddLesson'
import EditLesson from './components/Lesson/EditLesson'
import Profile from './components/Private/Profile'
import auth from './auth/auth'
import { getLocalStorage } from './utilities/LocalStorage'
import { UserContext } from './context/UserContext'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({ uri: 'https://api-euwest.graphcms.com/v1/ck56vnvt50t7301gifvv37btb/master' });

function App() {

  const [user, setUser] = useState(auth.isAuthenticated() ? getLocalStorage("profile") : null);

  return (
    <ApolloProvider client={client}>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Layout>
            <Switch>
              <Route exact path="/" component={RapGuides} />
              <Route path="/lessons" component={Lessons} />
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
  );
}

export default App;

