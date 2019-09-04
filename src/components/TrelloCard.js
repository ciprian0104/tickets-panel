import React, { useState } from "react";
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';
import { Draggable } from "react-beautiful-dnd";
import EditModal from "./EditModal";
import { editCard, deleteCard } from "../actions";
import { connect } from "react-redux";
import './TrelloCard.css';
import ActionButton from './ActionButton';
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrash, faEdit);


const TrelloCard = React.memo(({ priority, title, text, id, listID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setText] = useState(text);
  const [cardTitle, setTitle] = useState(title);
  const [cardPriority, setPriority] = useState(priority);


  const closeForm = e => {
    setIsEditing(false);
  };

  const handleChangeText = e => {
    setText(e.target.value);

  };
  const handleChangeTitle = e => {
    setTitle(e.target.value);
  }
  const handleChangePriority = e => {
    setPriority(e.target.value);
    console.log(e.target.value);
  }


  const handleDeleteCard = e => {
    dispatch(deleteCard(id, listID));
  }

  const saveCard = e => {

    e.preventDefault();
    dispatch(editCard(id, listID, cardText, cardTitle, cardPriority));
    setIsEditing(false);
  };

  const renderEditForm = () => {
    return (
      <EditModal show={isEditing} text={cardText} title={cardTitle}
        priority={cardPriority} onChangeText={handleChangeText} onChangePriority={handleChangePriority}
        onChangeTitle={handleChangeTitle} closeForm={closeForm}>
        <ActionButton onClick={saveCard}>Save</ActionButton>

      </EditModal>
    );

  };

  const renderCard = () => {
    return (

      <Draggable draggableId={String(id)} index={index}>
        {(provided, snapshot) => (
          <NaturalDragAnimation
            style={provided.draggableProps.style}
            snapshot={snapshot}
          >
            {style => (
              <div className="cardDiv"
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                onDoubleClick={() => setIsEditing(true)}

                style={style}
              >

                <Card bg="secondary" text="white" style={{ overflow: 'auto' }}>
                  <Card.Header style={{ paddingRight: '5px', boxSadow: "0 2px 4px grey" }}>

                    {title}
                    <Badge variant={priority} className="icon" disabled default="success">
                      {(priority === "danger") ? "High" : (priority === "warning") ? "Medium" : (priority === "success") ? "Low" : null}

                    </Badge>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {text}
                    </Card.Text>

                    <a><FontAwesomeIcon className="icon_delete" color="white" size="1x" icon="trash" onMouseDown={handleDeleteCard} /></a>
                    <a> <FontAwesomeIcon className="icon_edit" color="white" size="1x" icon="edit" onMouseDown={() => setIsEditing(true)} />
                      {(isEditing === true) ? renderEditForm() : null}

                    </a>

                  </Card.Body>
                </Card>
              </div>
            )}
          </NaturalDragAnimation>

        )}
      </Draggable>

    );
  };

  return renderCard();
});

export default connect()(TrelloCard);