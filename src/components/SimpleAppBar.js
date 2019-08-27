import React from 'react';
import Navbar from "react-bootstrap/Navbar"
import "./App.css";
import { Link } from "react-router-dom";


/**To be modified
TODO: Add functionality later

*/
export default function SimpleAppBar({title}) {
  return (
    <Navbar bg="secondary" variant="secondary">
    <Navbar.Brand className="buttonText" >
    <Link to="/">Go Back</Link>
    </Navbar.Brand>
    <h4>{title}</h4>
  </Navbar>
  );
}