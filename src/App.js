import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from './Components/Layout'
import ListCases from './Components/ListCases'
import CreateCase from './Components/CreateCase'
import AnalyseCase from './Components/AnalyseCase'
import Auth from './Components/Auth'
import {ProtectedRoute} from './Components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Route path="/auth">
          <div>name</div>
      </Route>
      <Layout>
        <Switch>
          <Route exact path="/" component={CreateCase}/>
          <Route exact path="/list-cases">
              <ListCases/>
          </Route>
          <Route path="/case/analyse-case/:id">
              <AnalyseCase/>
          </Route>
        </Switch>
      </Layout>
      </BrowserRouter>
  );
}

export default App;
