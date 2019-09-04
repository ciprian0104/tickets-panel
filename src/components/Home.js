import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBoard, deleteBoard, importBoard, editBoard } from "../actions/boardActions";
import { importList } from "../actions/listsActions";
import { importCard } from "../actions/cardsActions";
import { } from "../actions/"
import BoardThumbnail from "./BoardThumbnail";
import './Home.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faGrinAlt, faEdit  } from '@fortawesome/free-solid-svg-icons';
import Button from "react-bootstrap/Button";
import ImportFile from "../components/importFile";
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




library.add(faTrash, faGrinAlt, faEdit);
const Home = ({boardID, boards, boardOrder, dispatch }) => {
  // this is the home site that shows you your boards and you can also create a Board here.
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [isEmojing, setIsEmojing] = useState(false);
  const [emojiState, setEmoji] = useState({});
  const [createBoard, setCreateBoard] = useState(false);
  const [importFile, setImportFile] = useState(false)
  //var data = require('../data/loadData.json');
  const handleEmoji = e => {
    setEmoji(e.target.value);
  }
  const handleChange = e => {
    setNewBoardTitle(e.target.value);
  };
  const handleSubmit = e => {
    setCreateBoard(false);
    setIsEmojing(false);
    e.preventDefault();
    
    if(newBoardTitle ){
      
      console.log("Emoji state obj: ", emojiState.length);
      dispatch(addBoard(emojiState, newBoardTitle));
      setNewBoardTitle("");
      setEmoji({});
    }else{
      return;
    }
  };
const handleCloseStates = () => {
  setCreateBoard(false);
  setIsEmojing(false);
}


  const renderEmojis = (e) => {
      return (
        <Picker onClick={(emoji) => setEmoji(emoji)} title='Pick your emoji…' emoji='point_up' 
        
        />



      )
    }
    
  
 
  const renderBoards = () => {
    return boardOrder.map(boardID => {
      const board = boards[boardID];
      console.log("BOARD: ", board);
      const handleDeleteBoard = () =>{
        dispatch(deleteBoard(boardID={boardID}));
      }
      console.log("BOARD in HOME: ", board);
      return (
        <div style={{display:"flex", flexDirection:"row"}} key={boardID}>
      

        <Link

        key={boardID}
        to={`/${board.id}`}
        style={{ textDecoration: "none" }}
      >

        <BoardThumbnail {  ...board }> 

        
        </BoardThumbnail>
        {/*<Emoji  emoji={emoji} size={64}/>*/}

      </Link>
      <div style={{display:"flex", flexDirection:"column", marginTop:"15px"}}>
      <a><FontAwesomeIcon className="icon_delete" color="white" size="1x" icon="trash" onMouseDown={handleDeleteBoard} /></a>
      </div>
      </div>
      
     
    );
  });
};

const renderCreateBoard = () => {
  return (
  <div style={{display:"inlineBlock", maxWidth:"300px"}}>
  <FontAwesomeIcon className="icon_delete" color="black" size="2x" icon="grin-alt" onMouseDown={() => setIsEmojing(true)} />
  <Button variant="danger" onClick={handleSubmit} className="addBoardButton">Submit</Button>
  
  <form onSubmit={handleSubmit} style={{maxWidth:"200px"}}>
  {/*<FontAwesomeIcon className="icon_delete" color="white" size="3x" icon="grin-alt" onMouseDown={() => setIsEmojing(true)} />*/}

  <input
    className="create_input"
    onChange={handleChange}
    value={newBoardTitle}
    placeholder="Your boards title..."
    type="text"
  />
 
</form>
{isEmojing === true ? renderEmojis() : null}
    <Button variant="danger" onClick={() => handleCloseStates(false)} className="addBoardButton"> Close </Button>

</div>   
);
};
const handleImport = () => {
  return (
    <div>
    <ImportFile boardIds={boardOrder} importBoard={importBoard} importList={importList} 
            importCard={importCard} dispatch={dispatch} />
    
    <Button variant="danger" onClick={() => setImportFile(false)} className="addBoardButton"> Close </Button>
    </div>
  );
};



return (
<div className="home_container">
<div className="left_column">
<Button variant="danger" onClick={() => setImportFile(true)} className="addBoardButton"> Import files </Button>
{importFile === true ? handleImport() : null}
{/*renderCreateBoard()*/}
<Button variant="danger" onClick={() => setCreateBoard(true)} className="addBoardButton"> Create a new Board </Button>
{createBoard === true ? renderCreateBoard() : null}


</div>

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