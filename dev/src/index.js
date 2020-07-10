import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Menu from './components/Menu/Menu';
import Beers from './components/Menu/Beers';
import Admin from './components/Admin/Admin';
import 'fontsource-roboto';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Menu}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/beers" component={Beers}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));

