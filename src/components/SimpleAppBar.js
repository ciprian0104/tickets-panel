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
import 'emoji-mart/css/emoji-mart.css';
import { Emoji } from 'emoji-mart';

library.add(faAngleDoubleLeft);


export default function SimpleAppBar({ title, download, emoFace }) {
  const [truth, setTruth] = useState(false);
  if(truth){
    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);
    setTruth(false);
  }
  return (

<Navbar bg="secondary" style={{ width: "100%"}} expanded="true">
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Link to="/">
        <FontAwesomeIcon className="icon_arrow" color="white" size="4x" icon={faAngleDoubleLeft} />
      </Link>
      <div style={{marginLeft:"20px", display:"flex", flexDirection:"row", marginTop:"10px"}}>
      <Emoji emoji={emoFace} size={48}/>
      <h4 style={{ color: "white", marginTop: "10px", marginLeft: "5px" }}>{title}</h4>

      </div>

    </Nav>
    <Nav>
    <Button variant="outline-light" onClick={() => setTruth(true)}> 
      Download Board
      </Button>    
    </Nav>
  </Navbar.Collapse>
</Navbar>

  );
};
