import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/home/Home';
import V2 from './components/v2/V2';
import V3 from './components/v3/V3';

import './App.css';
class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/v2' component={V2}/>
            <Route exact path='/v3' component={V3}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
