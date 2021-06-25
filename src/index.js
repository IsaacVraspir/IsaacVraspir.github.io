import React, {
  Suspense,
  lazy,
} from "react";
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
} from "react-router-dom";

const App = lazy(() => import("./App"));

ReactDOM.render(
  <Suspense fallback={<div>loading</div>}>
    <React.StrictMode>
      <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
