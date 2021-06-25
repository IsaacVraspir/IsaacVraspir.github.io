import './App.css';
import React, {
  lazy,
} from "react";
import './index.css';
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";

const InnerPage = lazy(() => import("./components/innerPage/index.js"));
const InnerPageTwo = lazy(() => import("./components/innerPageTwo/index.js"));

function App() {
  return (
    <div>
      <Switch>
        <Route
          exact={true}
          path={'/pageTwo'}
          render={(props) => (
            <InnerPageTwo
              {...props}
            />
          )}
        />

        <Route
          exact={true}
          path={''}
          render={(props) => (
            <InnerPage
              {...props}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default withRouter(App);
