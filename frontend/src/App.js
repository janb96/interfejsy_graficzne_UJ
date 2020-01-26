import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/home/Home';

import V1 from './components/v1/V1';
import V2 from './components/v2/V2';
import V3 from './components/v3/V3';
import V3_simple from './components/v3/V3_simple';
import V4 from './components/v4/V4';
import V4_simple from './components/v4/V4_simple';
import V5 from './components/v5/V5';
import V5_simple from './components/v5/V5_simple';
import V6 from './components/v6/V6';
import V7 from './components/v7/V7';
import V7_simple from './components/v7/V7_simple';
import V8 from './components/v8/V8';
import V9 from './components/v9/V9';
import V9_simple from "./components/v9/V9_simple";
import V10 from './components/v10/V10';
import V10_simple from './components/v10/V10_simple';
import V11 from './components/v11/V11';
import V11_simple from './components/v11/V11_simple';
import V12 from './components/v12/V12';
import V12_simple from './components/v12/V12_simple';
import V13_simple from './components/v13/V13_simple';

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
            <Route exact path='/v4-simple' component={V4_simple}/>
            <Route exact path='/v5' component={V5}/>
            <Route exact path='/v5-simple' component={V5_simple}/>
            <Route exact path='/v6' component={V6}/>
            <Route exact path='/v7' component={V7}/>
            <Route exact path='/v7-simple' component={V7_simple}/>
            <Route exact path='/v8' component={V8}/>
            <Route exact path='/v9' component={V9}/>
            <Route exact path='/v9-simple' component={V9_simple}/>
            <Route exact path='/v10' component={V10}/>
            <Route exact path='/v10-simple' component={V10_simple}/>
            <Route exact path='/v11' component={V11}/>
            <Route exact path='/v11-simple' component={V11_simple}/>
            <Route exact path='/v12' component={V12}/>
            <Route exact path='/v12-simple' component={V12_simple}/>
            <Route exact path='/v13-simple' component={V13_simple}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
