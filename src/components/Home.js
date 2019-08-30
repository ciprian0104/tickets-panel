import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBoard, deleteBoard, addImportBoard } from "../actions/boardActions";
import {addImportList} from "../actions/listsActions";
import {addImportCard} from "../actions/cardsActions";
import { } from "../actions/"
import BoardThumbnail from "./BoardThumbnail";
import './Home.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from "react-bootstrap/Button";

library.add(faTrash);
const Home = ({boardID, boards, boardOrder, dispatch }) => {
  // this is the home site that shows you your boards and you can also create a Board here.
  const [newBoardTitle, setNewBoardTitle] = useState("");
  var data = require('../data/loadData.json');
  const handleChange = e => {
    setNewBoardTitle(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    
    if(newBoardTitle){
    
      dispatch(addBoard(newBoardTitle));
      
    }else{
      return;
    }
  };

  const importSubmit = e =>{
    e.preventDefault();
    dispatch(addImportBoard(data.boards.title, data.boards.id));
    for(var i = 0; i< data.lists.length; i++){
    console.log("LISTE:",data.lists[i])
    dispatch(addImportList(data.lists[i].id,data.boards.id,data.lists[i].title));
    }

    for(let i in data.cards){
      for(let j in data.cards[i]){
      console.log(data.cards[j])
      dispatch(addImportCard(data.cards[i][j].id, data.cards[i][j].list, data.cards[i][j].text, data.cards[i][j].title, data.cards[i][j].priority));
      }
    
  }
}
 
  const renderBoards = () => {
    return boardOrder.map(boardID => {
      const board = boards[boardID];
      const handleDeleteBoard = () =>{
        dispatch(deleteBoard(boardID={boardID}));
        console.log(boardID);
      }

      return (
        <div key={boardID}>
       
        <Link
        
        key={boardID}
        to={`/${board.id}`}
        style={{ textDecoration: "none" }}
      >

        <BoardThumbnail { ...board}/>
        
      </Link>
      <Button variant="danger" className="deleteBoardIcon" onClick={handleDeleteBoard}>Delete</Button>
      </div>
      
     
    );
  });
};

const renderCreateBoard = () => {
  return (    
  <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
  <h4 className="create_title">Create a new Board</h4>
  <input
    className="create_input"
    onChange={handleChange}
    value={newBoardTitle}
    placeholder="Your boards title..."
    type="text"
  />
 
</form>
  
);
};

return (
<div className="home_container">
{renderCreateBoard()}
<Button variant="danger" onClick={handleSubmit} className="addBoardButton">Submit</Button>
<Button variant="danger" onClick={importSubmit}>Import</Button>
<div className="thumbnails">{renderBoards()}</div>


    </div>
  );
};
const mapStateToProps = state => ({
  boards: state.boards,
  boardOrder: state.boardOrder
});
export default connect(mapStateToProps)(Home);