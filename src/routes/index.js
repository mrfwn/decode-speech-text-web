import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Route from './Route';
import Main from '../pages/Main';
import Decode from '../pages/Decode';
import Metrics from '../pages/Metric';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/decode" component={Decode} />
        <Route path="/metrics" component={Metrics} />
      </Switch>
    </BrowserRouter>
  );
}
