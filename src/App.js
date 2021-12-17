import React, {useEffect, useState} from 'react';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

require('dotenv').config()

function App() {
  return (
    <div>
      <Home />
    </div>
  )
}

export default App;
