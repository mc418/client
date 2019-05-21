import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Add from './components/Add';
import Edit from './components/Edit';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path='/' component={Home} />
          <Route path='/add/:userId' component={Add} />
          <Route path='/edit/:userId' component={Edit} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
