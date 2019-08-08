import React from "react";
import TrelloCard from "./TrelloCard";

import TrelloActionButton from "./TrelloActionButton";




const TrelloList = ({title, cards, listID} ) => {
    return(
        <div style={styles.container}>
            <h4>{title}</h4>
           {   //we render all the cards
               cards.map(card => <TrelloCard key={card.id} text={card.text} />)
           }

           <TrelloActionButton listID={listID}/>

        </div>     
    )
};

const styles= {
    container:{
        backgroundColor:"#dfe3e6",
        borderRadius:3,
        width: 300,
        padding: 8,
        marginRight: 10,
        height: "100%"
    }
};

export default TrelloList;