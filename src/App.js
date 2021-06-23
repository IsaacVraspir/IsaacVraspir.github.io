import logo from './logo.svg';
import './App.css';
import {
  Route,
  BrowserRouter,
  HashRouter,
  Redirect,
  Switch,
} from "react-router-dom";
import { withRouter, browserHistory } from "react-router";
import styled from "@emotion/styled";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { keyframes } from "emotion";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
