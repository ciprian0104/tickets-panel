import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBoard, deleteBoard, importBoard } from "../actions/boardActions";
import { importList } from "../actions/listsActions";
import { importCard } from "../actions/cardsActions";
import { } from "../actions/"
import BoardThumbnail from "./BoardThumbnail";
import './Home.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from "react-bootstrap/Button";
import ImportFile from "../components/importFile";


library.add(faTrash);
const Home = ({ boards, boardOrder, dispatch }) => {
  // this is the home site that shows you your boards and you can also create a Board here.
  const [newBoardTitle, setNewBoardTitle] = useState("");
  
  const handleChange = e => {
    setNewBoardTitle(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    
    if(newBoardTitle){
    
      dispatch(addBoard(newBoardTitle));
      setNewBoardTitle("");
    }else{
      return;
    }
  };

 
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
<ImportFile importBoard={importBoard} importList={importList} 
            importCard={importCard} dispatch={dispatch} />
{renderCreateBoard()}


<Button variant="danger" onClick={handleSubmit} className="addBoardButton">Submit</Button>

<div className="thumbnails">{renderBoards()}</div>




</div>
  );

};
const mapStateToProps = state => ({
  boards: state.boards,
  boardOrder: state.boardOrder,
  cards: state.cards,
  lists: state.lists

});
export default connect(mapStateToProps)(Home);