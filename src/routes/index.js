import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Board from "../components/Board";
import Home from "../components/Home";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/:boardID" component={Board} />
      </div>
    </Router>
  );
};

export default AppRouter;