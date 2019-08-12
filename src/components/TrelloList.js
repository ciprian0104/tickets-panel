import React from "react";
import TrelloCard from "./TrelloCard";

import TrelloActionButton from "./TrelloActionButton";

import {Droppable} from "react-beautiful-dnd";
import "./App.css";

const TrelloList = ({title, cards, listID} ) => {
    return(
        <Droppable droppableId={String(listID)}>
            {
                (provided) => (
                    <div 
                    {...provided.droppableProps} 
                    ref= {provided.innerRef}
                    
                    className="container">
                  <h4 className="list_title">{title}</h4>
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
    )
};



export default TrelloList;