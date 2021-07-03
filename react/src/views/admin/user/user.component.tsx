import React from 'react';
import { NavLink, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import External from './external.component';
import Internal from './internal.component';

const User = (): JSX.Element => {
  const { url } = useRouteMatch();

  return (
    <div className="content">
      <header>
        <h2>Users</h2>
      </header>
      <nav>
        <ul className="tabbar">
          <li><NavLink to={`${url}/external`}>External</NavLink></li>
          <li><NavLink to={`${url}/internal`}>Internal</NavLink></li>
        </ul>
      </nav>
      <main>
        <Switch>
          <Route path={`${url}/external`} component={External} />
          <Route path={`${url}/internal`} component={Internal} />
          <Redirect from={url} to={`${url}/external`} />
        </Switch>
      </main>
    </div>
  );
};

export default User;
