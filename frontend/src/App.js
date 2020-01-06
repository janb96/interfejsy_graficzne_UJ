import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/home/Home';
import V1 from './components/v1/V1';
import V3 from './components/v3/V3';
import V2 from './components/v2/V2';
import V4 from './components/v4/V4';
import V3_simple from './components/v3/V3_simple';
import V4_simple from './components/v4/V4_simple';
import V5 from './components/v5/V5';
import V5_simple from './components/v5/V5_simple';

import './App.css';
class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/v1' component={V1}/>
            <Route exact path='/v2' component={V2}/>
            <Route exact path='/v3' component={V3}/>
            <Route exact path='/v3-simple' component={V3_simple}/>
            <Route exact path='/v4' component={V4}/>
            <Route exact path='/v4-simple' component={V4_simple}/>
            <Route exact path='/v5' component={V5}/>
            <Route exact path='/v5-simple' component={V5_simple}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
