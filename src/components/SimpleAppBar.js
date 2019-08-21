import React from 'react';
import Navbar from "react-bootstrap/Navbar"
import "./App.css";


/**To be modified
TODO: Add functionality later

*/
export default function SimpleAppBar() {
  return (
    <Navbar bg="secondary" variant="secondary">
    <Navbar.Brand className="buttonText" >
      {'Tickets Panel'}
    </Navbar.Brand>
  </Navbar>
  );
}