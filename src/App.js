import './App.css';
import React, {
  lazy,
} from "react";
import './index.css';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {
  Consumer,
  ContextProvider,
} from "./components/userContext/userContext.js";

const InnerPage = lazy(() => import("./components/innerPage/index.js"));
const InnerPageTwo = lazy(() => import("./components/innerPageTwo/index.js"));

const App = (props) => {
  return (
    <div>
      <ContextProvider>
        <Consumer>
          {(context) => (
            <Switch>
              {!context.state.redirect.alreadyRedirected &&
                context.state.redirect.where !== "" ? (
                <Redirect
                  to={{ pathname: context.state.redirect.pathname }}
                />
              ) : null}

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
          )}
        </Consumer>
      </ContextProvider>
    </div>
  );
}

export default App;
