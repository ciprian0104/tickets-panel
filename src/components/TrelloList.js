import React from "react";
import TrelloCard from "./TrelloCard";
const TrelloList = ({title, cards} ) => {
    return(
        <div style={styles.container}>
            <h4>{title}</h4>
           {   //we render all the cards
               cards.map(card => <TrelloCard text={card.text} />)
           }
        </div>     
    )
};

const styles= {
    container:{
        backgroundColor:"#dfe3e6",
        borderRadius:3,
        width: 300,
        padding: 8,
        marginRight: 10
    }
};

export default TrelloList;