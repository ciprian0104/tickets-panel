import React, { useState } from "react";
import TrelloCard from "./TrelloCard";
import CreateCardForm from "./CreateCardForm";
import { Droppable, Draggable } from "react-beautiful-dnd";
import './App.css';
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { editTitle, deleteList } from "../actions";
//import { TextField } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Form from "react-bootstrap/Form"
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
    console.log("hi");

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
        <div className="container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={String(listID)} type="card">
            {provided => (
              <div 
              className="container_2"
              {...provided.droppableProps} ref={provided.innerRef}>
                {
                  isEditing ? (renderEditInput()) : (
                  <div className="titleContainer" onClick={() => setIsEditing(true)} >
                      <h4>{listTitle}</h4>
                      <FontAwesomeIcon icon="delete"/>
                      {/*
                      <IconButton fontSize="small" aria-label="delete" onClick={handleDeleteList}>
                        <DeleteIcon fontSize="small"/>
                      </IconButton>
                      */}

                  </div>
            )}

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
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default connect()(TrelloList);