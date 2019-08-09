import React from "react";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import {Draggable} from "react-beautiful-dnd";
const TrelloCard =({text, id, index})=> {
    return(
        <Draggable draggableId={String(id)} index={index}>
            {provided =>(
                //we create a ref that is pointing to the DOM note provided.innerRef
                //dragHandleDrops is for where we want to let the user to be able to handle the drag
                //for example we can let the user to drag a card only if it's dragging from the title
                <div ref={provided.innerRef}
                {...provided.draggableProps} 
                {...provided.dragHandleProps}>
         <Card style={styles.cardContainer}>
        <CardContent>
      <Typography gutterBottom>{text}</Typography>
        </CardContent>
        </Card>
        </div>
        )}
        </Draggable>
    );
};

const styles={
    cardContainer: {
        marginBottom: 5
    }
}
export default TrelloCard;