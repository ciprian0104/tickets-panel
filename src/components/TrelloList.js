import React, { useState } from "react";
import TrelloCard from "./TrelloCard";
import CreateCardForm from "./CreateCardForm";
import { Droppable, Draggable } from "react-beautiful-dnd";
import './App.css';
import styled from 'styled-components';
import { connect } from "react-redux";
import { editTitle, deleteList } from "../actions";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Form from "react-bootstrap/Form";

library.add(faTrash);

const Container = styled.div`

    border: 0.2px solid white;
    width: 390px;
    margin: 10px;

    height: 100%;
    padding: 15px 15px;
    word-wrap: break-word;
    display: flex;
    background-color: ${props => (props.isDragging ? 'darkgrey' : null)};

`;

const CardList = styled.div`
      width: 373px;

      background-color: ${props => (props.isDraggingOver ? 'darkgrey' : null)};

`;





const scrollContainerStyle = { maxHeight: "775px", paddingRight: "15px" };

const TrelloList = ({ id, title, cards, listID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);

  const renderEditInput = () => {
    return (
      <Form.Control
        style={{ width:"360px", height:"60px"}}
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
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >

          <Droppable droppableId={String(listID)} type="card">

            {(provided, snapshot) => (

              <CardList 


                {...provided.droppableProps} ref={provided.innerRef}
                
                isDraggingOver={snapshot.isDraggingOver}

                >


                {
                  isEditing ? (renderEditInput()) : (
                    <div className="titleContainer container" onClick={() => setIsEditing(true)} >
                      <h3 className="list_title">{listTitle}</h3>
                      <FontAwesomeIcon className="icon_delete" color="white" size="1x" icon="trash" onClick={handleDeleteList} />




                    </div>
                  )}
               
                  <div
                

                  
                  >
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
               
              </CardList>


            )}
          </Droppable>

        </Container>
      )}
    </Draggable>

  );
};

export default connect()(TrelloList);