import React from 'react'
import Layout from './components/Layout'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './components/Home'
import Video from './components/Video'
import RapGuides from './components/RapGuides'
import Teachers from './components/Teachers'
import MakeARapGuide from './components/MakeARapGuide'
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
          <Route exact path="/" component={Home} />
          <Route path="/rap-guides" component={RapGuides} />
          <Route path="/teachers" component={Teachers} />
          <Route path="/make-a-rap-guide" component={MakeARapGuide} />
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


