import React from "react";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./App.css";
import TextField from "@material-ui/core/TextField";
import "./EditCardForm.css";

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
      <Card className="add_card">
      <TextField
            placeholder={titleholder}

            value={title}
            onChange={e => onChangeTitle(e)}
          />
        <TextField
          placeholder={placeholder}
          value={text}
          onChange={e => onChangeText(e)}
        />


      <select defaultValue={priority} onChange={e=> onChangePriority(e)}
                className="form-control">
                    <option></option>
                    <option value={'red'}>High</option>
                    <option value={'yellow'}>Medium</option>
                    <option value={'green'}>Low</option>
                    </select>


      

      </Card>
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