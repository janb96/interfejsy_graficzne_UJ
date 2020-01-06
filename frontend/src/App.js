import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/home/Home';

import V1 from './components/v1/V1';
import V2 from './components/v2/V2';

import V3 from './components/v3/V3';
import V3_simple from './components/v3/V3_simple';

import V4 from './components/v4/V4';

import V6 from './components/v6/V6';

//https://onedrive.live.com/?authkey=%21AHKkFUYexN9ih%5FU&cid=9FFB083ADCCEB07E&id=9FFB083ADCCEB07E%2186803&parId=9FFB083ADCCEB07E%2186797&o=OneUp

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
            <Route exact path='/v6' component={V6}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
