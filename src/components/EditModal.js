import React from "react";
import Modal from 'react-bootstrap/Modal';
import "./App.css";
import "./EditCardForm.css";
import Form from 'react-bootstrap/Form';

//This is the edit form

const EditModal = React.memo(
  ({ list, text = "", title="",priority="" , onChangeText, onChangeTitle, onChangePriority, closeForm, children, show = false }) => {
    const titleholder= list ? "Enter list title..." :"Enter card title:";

    const placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";
      
        return (    
          <>   
            <Modal show={show}
            onHide={()=>closeForm(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Card</Modal.Title>
              </Modal.Header>
              <Modal.Body>
      
      <Form>
        <Form.Group>
          <Form.Control style={{width:"440px",height:"35px"}}  type="text" placeholder={titleholder} maxLength="15"
          value={title} onChange={e =>onChangeTitle(e)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control style={{width:"440px",height:"35px"}}  type="text" maxLength="200"placeholder={placeholder} 
          value={text} onChange={e =>onChangeText(e)}></Form.Control>
        </Form.Group>
        <Form.Control  style={{width:"440px",height:"35px"}}  as="select" defaultValue={priority} onChange={e=> onChangePriority(e)}>
              <option></option>
              <option value={'danger'}>High</option>
              <option value={'warning'}>Medium</option>
              <option value={'success'}>Low</option>
     
            </Form.Control>
        </Form>
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