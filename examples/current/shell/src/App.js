import React from 'react';

import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

import MicroFrontend from './MicroAppRenderer';

const MICRO_APPS = [
  {
    url: '/app1',
    exact: true,
    remote: {
      url: `http://localhost:3001/remoteEntry.js`,
      scope: 'app1',
      module: './App1',
    },
    title: 'App 1',
  },
  {
    url: '/app2',
    exact: true,
    remote: {
      url: `http://localhost:3002/remoteEntry.js`,
      scope: 'app2',
      module: './App2',
    },
    title: 'App 2',
  },
];

const NotMatch = ({ history }) => {
  history.go(0);
  return null;
};
const Index = () => <div>Nothing in the shell</div>;


const MicroAppRender = ({ match, title }) => {
  const microAppConfig = MICRO_APPS.find(({ url }) => url === match.path);

  document.title = title || document.title;

  return <MicroFrontend remote={microAppConfig.remote} />;
};

const App = () => (
  <div>
    <h1>Shell</h1>
    <NavLink
      to="/app1"
      activeStyle={{
        fontWeight: 'bold',
        color: 'red',
      }}
    >
      App 1
    </NavLink>
    <NavLink
      to="/app2"
      activeStyle={{
        fontWeight: 'bold',
        color: 'red',
      }}
    >
      App 2
    </NavLink>
    <React.Suspense fallback="Loading Button">
      <Switch>
        <Route exact path="/" component={Index} />
        {MICRO_APPS.map(({ url, exact, title }) => (
          <Route
            key={url}
            path={url}
            exact={exact}
            render={(props) => (
              <MicroAppRender {...props} title={title} />
            )}
          />
        ))}
        <Route component={NotMatch} />
      </Switch>
    </React.Suspense>
  </div>
);

export default App;
