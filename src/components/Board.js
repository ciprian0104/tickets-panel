import React, { PureComponent } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort, setActiveBoard } from "../actions";
import './App.css';
import CreateCardForm from "./CreateCardForm";
import SimpleAppBar from "./SimpleAppBar";
import { Button } from "@material-ui/core";


class Board extends PureComponent {
  componentDidMount() {
    // set active board here
    const { boardID } = this.props.match.params;
    this.props.dispatch(setActiveBoard(boardID));
  }
  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };
  
  

  //Medthod for downloading the json file.
  download(text, fileName) {
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
    a.setAttribute('download', fileName);
    return a;
  };
 

  render() {
    const { lists, cards, match, boards } = this.props;
    const { boardID } = match.params;
    
    const board = boards[boardID];
    if (!board) {
      return <p>Board not found</p>;
    }
    const listOrder = board.lists;
    
       //Making the textFile for download
       let textFile = {};

       textFile["boards"] = board;
       let listings =  listOrder.map(listID => lists[listID]);

       textFile["lists"] = listings;

       let listCards = listOrder.map(listID =>{
        const tempList = lists[listID];
   
        const cardsList = tempList.cards.map(cardID => cards[cardID]);
       
     return cardsList;
       })
       textFile["cards"] = listCards;
   
    //this.download(JSON.stringify(textFile), "board5.json")
    //console.log("TEXT FILE WITH STRINGIFY: ", JSON.stringify(textFile));

    //console.log("TEXT FILE NO STRINGIFY: ", textFile);
  
    return (
     <div className="background">
    
    <SimpleAppBar title = {board.title} download = {this.download(JSON.stringify(textFile), "board5.json")}/>

      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <div
              className="listContainer"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >

              {listOrder.map((listID, index) => {
                const list = lists[listID];

                if (list) {

                  const listCards = list.cards.map(cardID => cards[cardID]);
                 
                  /*
                  //this.download(JSON.stringify(textFile), "textFile")
                  textFile["lists"] = listOrder.map(listID=>lists[listID]);
                  //textFile["cards"] = cardOrder.map(cardID=> cards[cardID]);
                  
                  textFile["cards"] = listCards;
                  console.log(lists[listID].id)
                  console.log("TEXT FILE CONTENT IS: ", textFile);
                  console.log(boards[boardID].lists);
               
                  //this.download(JSON.stringify(textFile), "textFile")

                */
        
                return (
                    <TrelloList
                      listID={list.id}
                      key={list.id}
                      title={list.title}
                      cards={listCards}
                      index={index}
                    />
                  );
                }
              
              })}
              {provided.placeholder}
              <CreateCardForm list />
            </div>
          )}
        </Droppable>
       
      </DragDropContext>
      </div>
    );

  }
}


const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
  boards: state.boards,
 
});

export default connect(mapStateToProps)(Board);