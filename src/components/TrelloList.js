import React from "react";
import TrelloCard from "./TrelloCard";

import TrelloActionButton from "./TrelloActionButton";

import {Droppable} from "react-beautiful-dnd";


const TrelloList = ({title, cards, listID} ) => {
    return(
        <Droppable droppableId={String(listID)}>
            {
                (provided) => (
                    <div 
                    {...provided.droppableProps} 
                    ref= {provided.innerRef}
                    
                    style={styles.container}>
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
    )
};

const styles= {
    container:{
        backgroundColor:"#dfe3e6",
        borderRadius:3,
        width: 300,
        padding: 8,
        marginRight: 10,
        height: "100%",
        wordWrap: "break-word"
    }
};

export default TrelloList;