import React, { useState, setState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBoard, deleteBoard, importBoard, editBoard } from "../actions/boardActions";
import { importList } from "../actions/listsActions";
import { importCard } from "../actions/cardsActions";
import { } from "../actions/"
import BoardThumbnail from "./BoardThumbnail";
import './Home.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faGrinAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import Button from "react-bootstrap/Button";
import ImportFile from "../components/importFile";
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import {MDBScrollbar } from "mdbreact";
import {Nav,ListGroup} from "react-bootstrap";
import { Panel, CardGroup } from "react-bootstrap";
import { MDBBtn, MDBCollapse } from "mdbreact";



library.add(faTrash, faGrinAlt, faEdit);
const Home = ({boardID, boards, boardOrder, dispatch }) => {
// this is the home site that shows you your boards and you can also create a Board here.
const [newBoardTitle, setNewBoardTitle] = useState("");
const [isEmojing, setIsEmojing] = useState(false);
const [emojiState, setEmoji] = useState({});

const [createBoard, setCreateBoard] = useState(false);
const [activeKey,setActiveKey]=useState(false);
const [collapsed, setCollapsed] = useState(true);
const toggleNavbar = () => setCollapsed(!collapsed);
const [collapsedImport,setCollapsedImport] =useState(true);
const toggleImport =() => setCollapsedImport(!collapsedImport);
const [collapsedCreate,setCollapsedCreate] =useState(true);
const toggleNewBoard = () => setCollapsedCreate(!collapsedCreate);

//Hooks for showing the clicked board
const [tempID, setTempID] = useState('');
const [boardDetails, setBoardDetails] = useState(false);

const scrollContainerStyle = { width: "1200px", minHeight: "790px", maxHeight:"800px" };

//get this
const thumbnailDispatch = (id) => {
  setBoardDetails(true);
  setTempID(id)
  
}
//and this
const renderBoardDescription = () => {

  let board = boards[tempID];

  return (

    <div style={{display:"flex",
     flexDirection:"column",
      justifyContent:"center",
      margin: "250px"
      
      }}>
      <div className="emoji_styling">
      <Emoji  emoji={board.emoji} size={80} />
      </div>
      <h1>{board.title}</h1>

    <Link

    key={boardID}
    to={`/${board.id}`}
    style={{ textDecoration: "none" }}
  >


    <Button>NEXT PAGE</Button>



  </Link>

  <Button onClick={() => console.log(dispatch(deleteBoard(board.id)))}>DELETE</Button>

  </div>

  );


}
//and this
const BoardThumbnail = ({ id, title, emoji }) => {
  const handleDeleteBoard = (id) =>{
    dispatch(deleteBoard(boardID={id}));
  }


  return (
    <div style={{display:"flex", flexDirection:"row", cursor:"pointer"}}>
      <div className="emoji_styling"  onClick={() => thumbnailDispatch(id)}>
      <Emoji  emoji={emoji} size={64} />
      </div>
      <h4>{title}</h4>
      <Button onClick={() => handleDeleteBoard(id)}>DELETE</Button>
    </div>
  );
};





const handleChange = e => {
    setNewBoardTitle(e.target.value);
};
const handleSubmit = e => {
    setCreateBoard(false);
    setIsEmojing(false);
    e.preventDefault();

if(newBoardTitle ){

    dispatch(addBoard(emojiState, newBoardTitle));
    setNewBoardTitle("");
    setEmoji({});
  }
  else {
  return;
  }
  };
const handleCloseStates = () => {
  setCreateBoard(false);
  setIsEmojing(false);
  }
const handleToggle = e =>{
  setActiveKey(false);
}


const renderEmojis = (e) => {
  return (
  <Picker onClick={(emoji) => setEmoji(emoji)} title='Pick your emoji…' emoji='point_up' onLeave={() => setIsEmojing(false)}

/>



)
}

//and this
const renderBoardsList = () =>{
  return boardOrder.map(boardID => {
    const board = boards[boardID];


    return (
    <div style={{display:"flex", flexDirection:"row"}} key={boardID}>


{BoardThumbnail({ ...board })} 

</div>


);
});
}

const renderBoards = () => {
return boardOrder.map(boardID => {
const board = boards[boardID];
console.log("BOARD: ", board);

const handleDeleteBoard = () =>{
    dispatch(deleteBoard(boardID={boardID}));
}

return (
<div style={{display:"flex", flexDirection:"row"}} key={boardID}>
<Nav>
<Nav.Item>

<Nav.Link
    href={`/${board.id}`}
    key={boardID}
    to={`/${board.id}`}
    style={{ textDecoration: "none" }}
>

<BoardThumbnail { ...board }> 


</BoardThumbnail>

</Nav.Link>
</Nav.Item>

</Nav>

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

<input
    className="create_input"
    onChange={handleChange}
    value={newBoardTitle}
    placeholder="Your boards title..."
    type="text"
/>

</form>
{isEmojing === true ? renderEmojis() : null}
<Button variant="dark" onClick={() => handleCloseStates(false)} className="addBoardButton"> Close </Button>

</div> 
);
};
const handleImport = () => {
return (
<ImportFile boardIds={boardOrder} importBoard={importBoard} importList={importList} 
importCard={importCard} dispatch={dispatch} />

);
};



return (

<div className="home_container">

<div className="left_column">
        <>
        <MDBBtn
        color="primary"
        onClick={toggleNavbar}
        >
        COLLAPSE BUTTON
        </MDBBtn>
        <MDBCollapse className ="" id="basicCollapse" isOpen={!collapsed}>
        {renderBoardsList()} 
        </MDBCollapse>
        </>
        <>
        <MDBBtn
        color="primary"
        onClick={toggleImport}
        >
        COLLAPSE BUTTON
        </MDBBtn>
        <MDBCollapse className ="a" id="basicCollapse2" isOpen={!collapsedImport}>
        {handleImport()}
        </MDBCollapse>
        </>
        <>
        <MDBBtn
        color="primary"
        onClick={toggleNewBoard}
        >
        COLLAPSE BUTTON
        </MDBBtn>
        <MDBCollapse className ="a" id="basicCollapse2" isOpen={!collapsedCreate}>
        {renderCreateBoard()}
        </MDBCollapse>
        </>
</div>

      <div className="right_column">

      {boardDetails === true ? renderBoardDescription() : null}
      

      </div>

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