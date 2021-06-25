import './App.css';
import React, {
  lazy,
} from "react";
import './index.css';
import {
  Switch,
  BrowserRouter,
  Route
} from "react-router-dom";

const InnerPage = lazy(() => import("./components/innerPage/index.js"));

function App() {
  return (
    <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
      <div>
        get
        <Switch>
          <Route
            exact={true}
            path={"/innerPage"}
            render={(props) => (
              <InnerPage
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
