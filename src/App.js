import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import Home from "./components/Home";
import About from "./components/About";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React App</h2>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
