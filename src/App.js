import React, { useEffect } from 'react'
import Layout from './components/Layout/Layout'
import { Switch, Route, BrowserRouter as Router, useHistory } from 'react-router-dom'
import About from './components/Pages/About'
import Guide from './components/Guide/Guide'
import RapGuides from './components/Pages/RapGuides'
import Lessons from './components/Pages/Lessons'
import Request from './components/Pages/Request'
import Contact from './components/Pages/Contact'
import Login from './components/Pages/Login'
import PrivateRoute from './auth/PrivateRoute'
import PageNotFound from './components/Pages/PageNotFound'
import Lesson from './components/Pages/Lesson'
import AddLesson from './components/Lesson/AddLesson'
import Profile from './components/Private/Profile'
import auth from './auth/auth'
import { getLocalStorage, setLocalStorage } from './utilities/LocalStorage'
import data from './data/data'
import useGlobal from './store/Store'

function App() {

  const [globalState, globalActions] = useGlobal();

  /*
    TODO Setup the default data if it has been reset
    This will all be connected to a datasource of some kind
    but it is in Local Storage for prototyping
  */
  setLocalStorage("guides", JSON.stringify(data.guides));

  useEffect(() => {
    if (auth.isAuthenticated()) {
      let profile = JSON.parse(getLocalStorage("profile"));
      globalActions.setName(profile.nameFirst + ' ' + profile.nameLast);
      globalActions.setType(profile.type);
      globalActions.setProfileImage(profile.image);
    }
  }, []);

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
          <Route path="/guide/:id" component={Guide} />
          <Route path="/lesson/add/:id" component={AddLesson} />
          <Route path="/lesson/:id" component={Lesson} />
          <PrivateRoute
            path="/profile"
            component={Profile}
            authenticationPath="/"
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


