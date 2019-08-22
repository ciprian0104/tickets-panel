import React from "react";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./App.css";
import TextField from "@material-ui/core/TextField";
import "./EditCardForm.css";
import Form from 'react-bootstrap/Form';
import { FORMERR } from "dns";

//This is the edit form

const EditModal = React.memo(
  ({ list, text = "", title="",priority="" , onChangeText, onChangeTitle, onChangePriority, closeForm, children, show = false }) => {
    const titleholder= list ? "Enter list title..." :"Enter card title:";

    const placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";

      const buttonTitle = "Save";


      
        return (    
          <>   
            <Modal show={show}>
              <Modal.Header closeButton ={closeForm}>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
      
      <Form>
        <Form.Group>
          <Form.Control type="text" placeholder={titleholder} 
          value={title} onChange={e =>onChangeTitle(e)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" placeholder={placeholder} 
          value={text} onChange={e =>onChangeText(e)}></Form.Control>
        </Form.Group>
        </Form>
      
     


      <select defaultValue={priority} onChange={e=> onChangePriority(e)}
                className="form-control">
                    <option></option>
                    <option value={'red'}>High</option>
                    <option value={'yellow'}>Medium</option>
                    <option value={'green'}>Low</option>
                    </select>
         


      

     
              </Modal.Body>
              <Modal.Footer>
                {children}
              </Modal.Footer>
            </Modal>
          </>
        );
      }
      );

export default EditModal;