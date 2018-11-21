import React, { Component } from 'react';
import App from '../pages/app/app.js';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

class Routes extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
