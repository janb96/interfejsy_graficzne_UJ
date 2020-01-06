import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/home/Home';
import V1 from './components/v1/V1';
import V3 from './components/v3/V3';
import V2 from './components/v2/V2';
import V4 from './components/v4/V4';

import './App.css';
class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/v2' component={V1}/>
            <Route exact path='/v3' component={V3}/>
            <Route exact path='/v4' component={V4}/>
            <Route exact path='/language' component={V2}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
