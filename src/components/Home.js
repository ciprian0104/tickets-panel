import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBoard, deleteBoard } from "../actions";
import BoardThumbnail from "./BoardThumbnail";
import { library } from '@fortawesome/fontawesome-svg-core';
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


      return (

        <Link
        
        key={boardID}
        to={`/${board.id}`}
        style={{ textDecoration: "none" }}
      >

        <BoardThumbnail { ...board}/>
 
      </Link>
      
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
<div className="thumbnails">{renderBoards()}</div>
{renderCreateBoard()}
    </div>
  );
};
const mapStateToProps = state => ({
  boards: state.boards,
  boardOrder: state.boardOrder
});
export default connect(mapStateToProps)(Home);