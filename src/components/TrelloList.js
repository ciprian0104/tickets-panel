import React, { useState } from "react";
import TrelloCard from "./TrelloCard";
import CreateCardForm from "./CreateCardForm";
import { Droppable, Draggable } from "react-beautiful-dnd";
import './App.css';

import { connect } from "react-redux";
import { editTitle, deleteList } from "../actions";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Form from "react-bootstrap/Form";
import { MDBContainer, MDBScrollbar } from "mdbreact";
library.add(faTrash);
const scrollContainerStyle = {maxHeight: "775px", paddingRight:"15px" };

const TrelloList = ({ title, cards, listID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);

  const renderEditInput = () => {
    return (
      <Form.Control
      as="textarea"
      className="editList"
      value={listTitle}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleFinishEditing}
      autoFocus
      />
    )
  }

  const handleDeleteList = () => {
    dispatch(deleteList(listID));
  };

  const handleFocus = e => {

    e.target.select();
  };

  const handleChange = e => {
    e.preventDefault();
    setListTitle(e.target.value);
  };

  const handleFinishEditing = e => {
    setIsEditing(false);
    dispatch(editTitle(listID, listTitle));
  };

  return (
    
    <Draggable draggableId={String(listID)} index={index}>
      {provided => (
        <div className="container_2"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          
          <Droppable droppableId={String(listID)} type="card">
          
            {provided => (
             
              <div 
              
              
              {...provided.droppableProps} ref={provided.innerRef}>
                
                
                {
                  isEditing ? (renderEditInput()) : (
                  <div className="titleContainer" onClick={() => setIsEditing(true)} >
                      <p className="list_title">{listTitle}</p>
                      <FontAwesomeIcon className="icon_delete" color="white" size="1x" icon="trash" onClick={handleDeleteList}/>
                      
                      
                      

                  </div>
            )}
                 <MDBContainer>
                   <div className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle} >
                {cards.map((card, index) => (
                   
                  <TrelloCard
                    key={card.id}
                    title={card.title}
                    text={card.text}
                    priority={card.priority}
                    id={card.id}
                    index={index}
                    listID={listID}
                  />
                 
                ))}
                
                {provided.placeholder}
                <CreateCardForm listID={listID} />
                </div>
              </MDBContainer>
              </div>
              
              
            )}
          </Droppable>
          
        </div>
      )}
    </Draggable>
   
  );
};

export default connect()(TrelloList);