import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from './Components/Layout'
import ListCases from './Components/ListCases'
import CreateCase from './Components/CreateCase'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={CreateCase}/>
          <Route path="/list-cases">
              <ListCases/>
              <Route path="/analyse-case:id">
              </Route>
          </Route>
        </Switch>
      </Layout>
      </BrowserRouter>
  );
}

export default App;
