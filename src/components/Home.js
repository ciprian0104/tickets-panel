import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBoard, deleteBoard } from "../actions";
import BoardThumbnail from "./BoardThumbnail";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Home.css';


const Home = ({ boards, boardOrder, dispatch }) => {
  // this is the home site that shows you your boards and you can also create a Board here.
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const handleChange = e => {
    setNewBoardTitle(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addBoard(newBoardTitle));
  };

  const renderBoards = () => {
    return boardOrder.map(boardID => {
      const board = boards[boardID];

      const handleDeleteBoard = () => {
      
      dispatch(deleteBoard(boardID = {boardID}));
      console.log("HOME handleDELETEBOARD loop with ID: ", boardID);
      
    };


      return (
        <div key={boardID} >
          
          <div style={{padding: '20px'}}><FontAwesomeIcon className="icon_delete" color="blue" size="1x" icon="trash" onClick={handleDeleteBoard}/></div>

        <Link
        
        key={boardID}
        to={`/${board.id}`}
        style={{ textDecoration: "none" }}
      >

        <BoardThumbnail { ...board}/>
 
      </Link>
      </div>
    );
  });
};

const renderCreateBoard = () => {
  return (    
  <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
  <h3 className="create_title">Create a new Board</h3>
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
<div className="thumbnails">{renderBoards()}</div>

    </div>
  );
};
const mapStateToProps = state => ({
  boards: state.boards,
  boardOrder: state.boardOrder
});
export default connect(mapStateToProps)(Home);