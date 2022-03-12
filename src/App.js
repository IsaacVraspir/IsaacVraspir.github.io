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

const SkettiOdinHome = lazy(() => import("./components/skettiOdinHome/index.js"));
const Leaderboard = lazy(() => import("./components/leaderboard/index.js"));
const WXAdventures = lazy(() => import("./components/WXAdventures/index.js"));
const Paps = lazy(() => import("./components/paps/index.js"));
const UltimateScaling = lazy(() => import("./components/ultimateScaling/index.js"));
const TcgSim = lazy(() => import("./components/tcgSim/index.js"));
//const Logo = lazy(() => import("./components/logo/index.js"));
//const LogoWithoutBackground = lazy(() => import("./components/logoWithoutBackground/index.js"));

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
                  <SkettiOdinHome
                    {...props}
                  />
                )}
              />

              <Route
                exact={true}
                path={'/leaderboard'}
                render={(props) => (
                  <Leaderboard
                    {...props}
                  />
                )}
              />

              <Route
                exact={true}
                path={'/wxadventures'}
                render={(props) => (
                  <WXAdventures
                    {...props}
                  />
                )}
              />

              <Route
                exact={true}
                path={'/paps'}
                render={(props) => (
                  <Paps
                    {...props}
                  />
                )}
              />

              <Route
                exact={true}
                path={'/ultimateScaling'}
                render={(props) => (
                  <UltimateScaling
                    {...props}
                  />
                )}
              />

              <Route
                exact={true}
                path={'/tcgsim'}
                render={(props) => (
                  <TcgSim
                    {...props}
                  />
                )}
              />

            {/*
              <Route
                exact={true}
                path={'/logo'}
                render={(props) => (
                  <Logo
                    {...props}
                  />
                )}
              />

              <Route
                exact={true}
                path={'/logoWithoutBackground'}
                render={(props) => (
                  <LogoWithoutBackground
                    {...props}
                  />
                )}
              />
            */}
            
            </Switch>
          )}
        </Consumer>
      </ContextProvider>
    </div>
  );
}

export default App;
