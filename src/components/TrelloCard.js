import React from "react";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import {Draggable} from "react-beautiful-dnd";
import "./App.css";

const TrelloCard =({text, title, id, index})=> {
    return(
        <Draggable draggableId={String(id)} index={index}>
            {provided =>(
                //we create a ref that is pointing to the DOM note provided.innerRef
                //dragHandleDrops is for where we want to let the user to be able to handle the drag
                //for example we can let the user to drag a card only if it's dragging from the title
                <div ref={provided.innerRef}
                {...provided.draggableProps} 
                {...provided.dragHandleProps}>
         <Card className="cardContainer">
         <Typography variant ="h6" className="cardTitle" gutterBottom>{title}</Typography>
        <CardContent className="cardContent">
        <Typography className="card_text" gutterBottom>{text}</Typography>
      <IconButton aria-label="delete">
          <DeleteIcon className="delete_icon" fontSize="small" />
        </IconButton>
        
       
        </CardContent>
        </Card>
        </div>
        )}
        </Draggable>
    );
};


export default TrelloCard;