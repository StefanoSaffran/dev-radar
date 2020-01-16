import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Dashboard from '../pages/Dashboard';
import UpdateDev from '../pages/UpdateDev';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/dev/:id" component={UpdateDev} />
    </Switch>
  );
};

export default Routes;
