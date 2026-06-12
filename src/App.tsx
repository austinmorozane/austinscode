import { Component } from "react";
import { Router } from "./components/base/Router";
import { HashRouter } from "react-router-dom";
import './App.css';
// main app

class MainApp extends Component {

  // javascript goes here
  render() {
    return (
      <HashRouter>
        <Router />
      </HashRouter>
    );
  }
}




export default MainApp;
