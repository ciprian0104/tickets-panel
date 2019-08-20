import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Draggable } from "react-beautiful-dnd";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete"
import Chip from '@material-ui/core/Chip';
import EditCardForm from "./EditCardForm";
import { editCard, deleteCard } from "../actions";
import { connect } from "react-redux";
import CardHeader from "@material-ui/core/CardHeader";
import './TrelloCard.css';
import { Grid } from "@material-ui/core";
import ActionButton from './ActionButton';


const TrelloCard = React.memo(({priority ,title, text, id, listID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setText] = useState(text);
  const [cardTitle, setTitle] = useState(title);
  const [cardPriority,setPriority] = useState(priority);

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

      <EditCardForm text={cardText} title={cardTitle} priority={cardPriority} onChangeText={handleChangeText} onChangePriority={handleChangePriority} onChangeTitle={handleChangeTitle} closeForm={closeForm}>
      <ActionButton onClick={saveCard}>Save</ActionButton>

      </EditCardForm>
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
            <Card 
            className="textStyles"
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
              <CardHeader
              fontFamily="Italic"
              variant="h4"
              title={title}
              />

              <CardContent>
                <Typography
                >
                {text}</Typography>
              </CardContent>
              <Chip style={{backgroundColor: priority}} size="small" display="flex" justifyContent="center" 

flexWrap="wrap" variant="outlined" label={(priority === "red") ? "High" : (priority === "yellow") ? "Medium" : (priority === "green") ? "Normal" : "Undefined" }/>
            </Card>
          </div>
        )}
      </Draggable>
    );
  };

  return isEditing ? renderEditForm() : renderCard();
});

export default connect()(TrelloCard);