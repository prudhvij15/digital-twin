import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard";
import D3LineGraph from "./components/D3LineGraph";

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
