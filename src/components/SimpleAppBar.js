import React from 'react';
import Navbar from "react-bootstrap/Navbar"
import "./App.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import Button from 'react-bootstrap/Button';

import Nav from 'react-bootstrap/Nav';
library.add(faAngleDoubleLeft);


export default function SimpleAppBar({ title, download }) {
  const [truth, setTruth] = useState(false);
  if(truth){
    download.click();
    setTruth(false);
  }
  return (

<Navbar bg="secondary" style={{ width: "100%" }} expanded="true">
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Link to="/">
        <FontAwesomeIcon className="icon_arrow" color="white" size="3x" icon={faAngleDoubleLeft} />
      </Link>
      <h4 style={{ color: "white", marginLeft: "20px", marginTop: "7px" }}>{title}</h4>

    </Nav>
    <Nav>
    <Button variant="outline-light" onClick={() => setTruth(true)}> 
      Download Board
      </Button>    </Nav>
  </Navbar.Collapse>
</Navbar>

  );
}
