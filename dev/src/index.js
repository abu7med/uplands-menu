import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Menu from './components/Menu/Menu';
import Beers from './components/Menu/Beers';
import Ciders from './components/Menu/Ciders';
import Sodas from './components/Menu/Sodas';
import Food from './components/Menu/Food';
import Drinks from './components/Menu/Drinks';
import Shots from './components/Menu/Shots';
import Wines from './components/Menu/Wines';
import Whiskey from './components/Menu/Whiskey';
import Boardgames from './components/Menu/Boardgames';
import Admin from './components/Admin/Admin';
// import 'fontsource-roboto';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Menu}/>
        <Route exact path="/admin" component={Admin}/>
        <Route path="/beers" component={Beers}/>
        <Route path="/ciders" component={Ciders}/>
        <Route path="/sodas" component={Sodas}/>
        <Route path="/food" component={Food}/>
        <Route path="/drinks" component={Drinks}/>
        <Route path="/shots" component={Shots}/>
        <Route path="/wine" component={Wines}/>
        <Route path="/whiskey" component={Whiskey}/>
        <Route path="/boardgames" component={Boardgames}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));


