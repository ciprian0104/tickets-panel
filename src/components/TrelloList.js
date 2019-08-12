import React from "react";
import TrelloCard from "./TrelloCard";

import TrelloActionButton from "./TrelloActionButton";

import {Droppable, Draggable} from "react-beautiful-dnd";
import "./App.css"


const TrelloList = ({title, cards, listID, index} ) => {
    return(
        <Draggable draggableId={String(listID)} index={index} >

        {provided =>( 
            <div className="listContainer" 
                    {...provided.draggableProps} 
                    ref= {provided.innerRef}
                    {...provided.dragHandleProps}
                    >
        <Droppable droppableId={String(listID)}>
            {(provided) => (

                <div{...provided.droppableProps} ref={provided.innerRef}>

                  <h4>{title}</h4>
           {   //we render all the cards
               cards.map((card,index) => 
               <TrelloCard 
               key={card.id}
               index={index}
               text={card.text}
                id={card.id}
               />)
           }

           <TrelloActionButton listID={listID}/>
           {/*contains every single item that we give 
            when u drag the card is gonna create a placeholder*/}
           {provided.placeholder}
            </div>
                )
            }
             
        </Droppable>
        </div>

        ) }


        </Draggable>

    )
};

export default TrelloList;