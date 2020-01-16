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
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;


