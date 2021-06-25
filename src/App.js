import './App.css';
import React, {
  lazy,
} from "react";
import './index.css';
import {
  Switch,
  Route,
} from "react-router-dom";

const InnerPage = lazy(() => import("./components/innerPage/index.js"));
const InnerPageTwo = lazy(() => import("./components/innerPageTwo/index.js"));

const App = (props) => {
  return (
    <div>
      <Switch>
        <Route
          exact={true}
          path={'/'}
          render={(props) => (
            <InnerPage
              {...props}
            />
          )}
        />

        <Route
          exact={true}
          path={'/pageTwo'}
          render={(props) => (
            <InnerPageTwo
              {...props}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
