import React from 'react'
import Layout from './components/Layout'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import About from './components/About'
import Video from './components/Video'
import RapGuides from './components/RapGuides'
import Lessons from './components/Lessons'
import Request from './components/Request'
import Contact from './components/Contact'
import Login from './components/Login'
import PrivateRoute from './auth/PrivateRoute'
import Manage from './components/Manage'
import PageNotFound from './components/PageNotFound'
import auth from './auth/auth'

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={RapGuides} />
          <Route path="/lessons" component={Lessons} />
          <Route path="/request" component={Request} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/contact" component={Contact} />
          <Route path="/video/:id" component={Video} />
          <PrivateRoute
            path="/manage"
            component={Manage}
            authenticationPath="/login"
            isAuthenticated={auth.isAuthenticated()}
            isAllowed={auth.isAuthenticated()}
            restrictedPath="/404"
          />
          <Route component={PageNotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;


