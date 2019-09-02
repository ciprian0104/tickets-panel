import React from 'react';
import Navbar from "react-bootstrap/Navbar"
import "./App.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import Button from 'react-bootstrap/Button';
library.add(faAngleDoubleLeft);


/**To be modified
TODO: Add functionality later
style={{width:"100%", position:"absolute"}}
*/


export default function SimpleAppBar({ title, download }) {
  const [truth] = useState(false);
  const [setTruth] = useState(false);
  if(truth){
    download.click();
    setTruth(false);
  }
  const handleChange = e => {
    let file = e.target.files;
    console.log(file);
    
    let reader = new FileReader();
    const text=reader.readAsText(file[0]);
    const parseContent= JSON.parse(text);
    console.log(parseContent.cards);
    reader.onload = (e) =>{
      console.log("data", e.target.result)
    
     
      
    }
    //var data = require(file);
    //console.log("DATA:--",data);

  };
  
  return (

    <Navbar style={{ width: "100%" }} expanded="true" bg="secondary" variant="secondary">

      <Link to="/">
        <FontAwesomeIcon className="icon_arrow" color="white" size="3x" icon={faAngleDoubleLeft} />
      </Link>
      <Navbar.Brand className="buttonText" >

        <h4 style={{ color: "white", marginLeft: "20px", marginTop: "7px" }}>{title}</h4>

      </Navbar.Brand>

      <Button onClick={() => setTruth(true)}> TEST </Button>
      <input type="file" name="file" onChange={handleChange}/>
    
    </Navbar>
  );
}