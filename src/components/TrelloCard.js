import React from "react";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import {Draggable} from "react-beautiful-dnd";
import "./App.css";
import MoreVertIcon from '@material-ui/icons/MoreVert';

import CardHeader from '@material-ui/core/CardHeader';
import { Grid, Button } from "@material-ui/core";

import Chip from '@material-ui/core/Chip';


const TrelloCard =({priority ,text, title, id, index})=> {


    return(

    <Draggable draggableId={String(id)} index={index}>
    {provided =>(
    //we create a ref that is pointing to the DOM note provided.innerRef
    //dragHandleDrops is for where we want to let the user to be able to handle the drag
    //for example we can let the user to drag a card only if it's dragging from the title
    <div className="cardContainer"
    ref={provided.innerRef}
    {...provided.draggableProps} 
    {...provided.dragHandleProps}
    >



    <Card className = "cardContainer">

    <CardHeader

        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
      />

    <CardContent className="cardContent">


    <Typography className="card_text" gutterBottom>{text}</Typography>

    </CardContent>
    <Grid
          direction="row"
          justify="flex-end"
          alignItems="center"
          container 
          
    >
      
    <Chip style={{backgroundColor: priority}} size="small" display="flex" justifyContent="center" 
    
    flexWrap="wrap" variant="outlined" label={(priority === "red") ? "High" : (priority === "yellow") ? "Medium" : "Normal"}/>

    <IconButton aria-label="delete" align="right">
          <DeleteIcon className="delete_icon" fontSize="small" />
        </IconButton>

        <IconButton aria-label="edit" className="deleteEdit" align="right">
          <EditIcon className="edit_icon" fontSize="small" />

        </IconButton>
        </Grid>      


        </Card>
    </div>
    )}
    </Draggable>
);

};

export default TrelloCard;
