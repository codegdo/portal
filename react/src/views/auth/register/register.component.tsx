import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { RegisterForm } from './register.form';
import { SelectForm } from './select.form';
import { SelectOrg } from './select.org';


const Register: React.FC = (): JSX.Element => {
  const match = useRouteMatch();
  console.log(match);
  return <Switch>
    <Route path={`${match.path}/:org/:form`} component={RegisterForm} />
    <Route path={`${match.path}/:org`} component={SelectForm} />
    <Route exact path={`${match.path}`} component={SelectOrg} />
  </Switch>
}

export default Register;