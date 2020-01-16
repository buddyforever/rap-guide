import React from 'react'
import Layout from './components/Layout'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './components/Home'

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;


