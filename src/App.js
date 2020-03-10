import React from 'react'
import Layout from './components/Layout/Layout'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import About from './components/Pages/About'
import Video from './components/Video/Video'
import RapGuides from './components/Pages/RapGuides'
import Lessons from './components/Pages/Lessons'
import Request from './components/Pages/Request'
import Contact from './components/Pages/Contact'
import Login from './components/Pages/Login'
import PrivateRoute from './auth/PrivateRoute'
import PageNotFound from './components/Pages/PageNotFound'
import Lesson from './components/Pages/Lesson'
import Profile from './components/Private/Profile'
import auth from './auth/auth'
import { getLocalStorage, setLocalStorage } from './utilities/LocalStorage'
import data from './data/data'

function App() {

  if (getLocalStorage("guides") === null) {
    setLocalStorage("guides", JSON.stringify(data.guides));
  }

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
          <Route path="/lesson/:id" component={Lesson} />
          <PrivateRoute
            path="/profile"
            component={Profile}
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


