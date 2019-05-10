import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from '../home/home';
import Page1 from '../page1/page1';

export const RouterAdmin = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/page1" component={Page1} />
      
    </Router>
  );
}