import React from 'react';
import Navbar from "react-bootstrap/Navbar"
import "./App.css";
import { Link } from "react-router-dom";
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faAngleDoubleLeft);

/**To be modified
TODO: Add functionality later

*/
export default function SimpleAppBar({ title }) {
  return (

    <Navbar style={{ width: "100%" }} expanded="true" bg="secondary" variant="secondary">

      <Link to="/">
        <FontAwesomeIcon className="icon_arrow" color="white" size="3x" icon={faAngleDoubleLeft} />
      </Link>
      <Navbar.Brand className="buttonText" >

        <h4 style={{ color: "white", marginLeft: "20px", marginTop: "7px" }}>{title}</h4>

      </Navbar.Brand>
    
    </Navbar>
  );
}