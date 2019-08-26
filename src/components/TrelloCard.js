import React, { useState } from "react";
//import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Draggable } from "react-beautiful-dnd";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete"
import Chip from '@material-ui/core/Chip';
import EditCardForm from "./EditCardForm";
import EditModal from "./EditModal";
import { editCard, deleteCard } from "../actions";
import { connect } from "react-redux";
import CardHeader from "@material-ui/core/CardHeader";
import './TrelloCard.css';

import ActionButton from './ActionButton';
import Box from '@material-ui/core/Box';
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrash, faEdit);
const TrelloCard = React.memo(({priority ,title, text, id, listID, index, dispatch }) => {
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
  const handleChangePriority = e =>{
    setPriority(e.target.value);
    console.log(e.target.value);
  }


  const handleDeleteCard = e => {
    dispatch(deleteCard(id, listID));
  }

  const saveCard = e => {

    e.preventDefault();
    dispatch(editCard(id, listID, cardText, cardTitle,cardPriority));
    setIsEditing(false);
  };

  const renderEditForm = () => {
    return (
      /*
      <EditCardForm text={cardText} title={cardTitle} priority={cardPriority} onChangeText={handleChangeText} onChangePriority={handleChangePriority} onChangeTitle={handleChangeTitle} closeForm={closeForm}>
      <ActionButton onClick={saveCard}>Save</ActionButton>

      </EditCardForm>
      */

     <EditModal show = {isEditing} text={cardText} title={cardTitle}
     priority={cardPriority} onChangeText={handleChangeText} onChangePriority={handleChangePriority}
      onChangeTitle={handleChangeTitle} closeForm={closeForm}>
    <ActionButton onClick={saveCard}>Save</ActionButton>

    </EditModal>
  );
    
  };

  const renderCard = () => {
    return (

      <Draggable draggableId={String(id)} index={index}>
        {provided => (
          <div className="cardDiv"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onDoubleClick={() => setIsEditing(true)}
          >
            
            <Card bg="secondary" text="white" style={{width:'18rem', overflow:'auto'}}>
              <Card.Header style={{width:'275px',paddingRight: '5px'}}>
                
                {title}
                <Badge variant={priority}  className="icon" disabled>
                {(priority === "danger") ? "High" : (priority === "warning") ? "Medium" : (priority === "success") ? "Low" : null}
             
                </Badge>
              </Card.Header>
              <Card.Body>
              <Card.Text>
                {text}
              </Card.Text>
              
              <a><FontAwesomeIcon className="icon_delete" color="white" size="1x" icon="trash" onMouseDown={handleDeleteCard}/></a>
              <a> <FontAwesomeIcon className="icon_edit" color="white" size="1x" icon="edit" onMouseDown={()=>setIsEditing(true)} />
              {(isEditing === true) ? renderEditForm() : null}
              
              </a>
              
              </Card.Body>
            </Card>
            {/*
            <Card 
            style={{backgroundColor:"white"} }
            
            >
            <IconButton
                aria-label="edit"
                onMouseDown={() => setIsEditing(true)}
                fontSize="small"
              >
                <EditIcon  fontSize="small"/>
            </IconButton>
            <IconButton
                aria-label="delete"
                onMouseDown={handleDeleteCard}
                fontSize="small"
            >
              <DeleteIcon  fontSize="small"/>
            </IconButton>
              
              <Typography
                variant="h6"
                >
                <Box  textAlign="center" >
                  {title}
                </Box>
                </Typography>

              <CardContent>
                <Typography
                variant="body1"
                >
                <Box  textAlign="center" >
                  {text}
                </Box>
                </Typography>
              </CardContent>
              <Chip className="chip" style={{backgroundColor: priority}} size="medium" display="flex" justifyContent="center" 

flexWrap="wrap" variant="outlined" label={(priority === "red") ? "High" : (priority === "yellow") ? "Medium" : (priority === "green") ? "Normal" : "Undefined" }/>
            </Card>*/}
          </div>
        )}
      </Draggable>

    );
  };

  return renderCard();
});

export default connect()(TrelloCard);