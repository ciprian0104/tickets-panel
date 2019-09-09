import React, { useState, setState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBoard, deleteBoard, importBoard, editBoard } from "../actions/boardActions";
import { importList } from "../actions/listsActions";
import { importCard } from "../actions/cardsActions";
import { } from "../actions/"

import './Home.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faGrinAlt, faEdit  } from '@fortawesome/free-solid-svg-icons';
import Button from "react-bootstrap/Button";
import ImportFile from "../components/importFile";
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
import Form from "react-bootstrap/Form";
import {Nav} from "react-bootstrap";

import { MDBBtn, MDBCollapse } from "mdbreact";



library.add(faTrash, faGrinAlt, faEdit);
const Home = ({boardID, boards, boardOrder, dispatch }) => {
  // this is the home site that shows you your boards and you can also create a Board here.
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [isEmojing, setIsEmojing] = useState(false);
  const [emojiState, setEmoji] = useState({});
  const [createBoard, setCreateBoard] = useState(false);

  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const [collapsedImport,setCollapsedImport] =useState(true);
  const toggleImport =() => setCollapsedImport(!collapsedImport);
  const [collapsedCreate,setCollapsedCreate] =useState(true);
  const toggleNewBoard = () => setCollapsedCreate(!collapsedCreate,!collapsed);
 
  
  //Hooks for showing the clicked board
  const [tempID, setTempID] = useState('');
  const [boardDetails, setBoardDetails] = useState(false);
  //get this
const thumbnailDispatch = (id) => {
  setBoardDetails(true);
  setTempID(id)
  
}
//and this
const renderBoardDescription = () => {

  let board = boards[tempID];

const handleDeleteBoard = () =>{
        dispatch(deleteBoard(boardID={tempID}));
      }
  return (

    <div style={{display:"flex",
     flexDirection:"column",
      justifyContent:"center",
      margin: "250px"
      
      }}>
      
      <Emoji  emoji={board.emoji} size={80} /> 
      
      <h1 style={{color:"white"}}>{board.title}</h1>
    <div style={{display:"flex",flexDirection:"row"}}>
    
    
    <Link

    key={boardID}
    to={`/${board.id}`}
    style={{ textDecoration: "none" }}
  >


    <Button variant="outline-light" className="nextPageButton">GO TO BOARD</Button>
  </Link>
 
  </div>
  <div className="descriptionContent">
    <h6 style={{color:"white"}}>Description</h6>
  </div>
  </div>


  );


}
//and this
const BoardThumbnail = ({ id, title, emoji }) => {



  return (
    <div style={{display:"flex", position:"relative",flexDirection:"row", cursor:"pointer"}} onClick={() => thumbnailDispatch(id)}>
      <div className="emoji_styling">
      <Emoji emoji={emoji} size={32} />
      </div>
      <h4 className="titleBoard">{title}</h4>
    </div>
  );
};

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
    
    if(newBoardTitle){
      
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
    
  
//and this
const renderBoardsList = () =>{
  return boardOrder.map(boardID => {
    const board = boards[boardID];


    return (
    <div style={{justifyContent:"center",display:"flex", flexDirection:"row"}} key={boardID}>


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
      console.log("BOARD in HOME: ", board);
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

        <BoardThumbnail {  ...board }> 

        
        </BoardThumbnail>
        {/*<Emoji  emoji={emoji} size={64}/>*/}

      </Nav.Link>
      </Nav.Item>
      {/*
      <div style={{display:"flex", flexDirection:"column", marginTop:"15px"}}>
      <a><FontAwesomeIcon className="icon_delete" color="white" size="1x" icon="trash" onMouseDown={handleDeleteBoard} /></a>
      </div> */}
      </Nav>

      </div>
      
     
    );
  });
};

const renderCreateBoard = () => {
  return (
  <div style={{display:"inlineBlock", maxWidth:"300px"}}>
  
  
  <h5 style={{color:"white"}}>Create form</h5>
  <form onSubmit={handleSubmit} >
  {/*<FontAwesomeIcon className="icon_delete" color="white" size="3x" icon="grin-alt" onMouseDown={() => setIsEmojing(true)} />*/}

  <input
    className="create_input"
    onChange={handleChange}
    value={newBoardTitle}
    placeholder="Your boards title..."
    type="text"
  />
  <Form>
    <Form.Group>
      <Form.Label style={{color:"white",fontSize:"20px",fontStyle:"bold"}}>Board description</Form.Label>
      <Form.Control as="textarea" maxLength="255" style={{width:"350px"}} rows="3"/>
    </Form.Group>
  </Form>
  {renderEmojis()}
  <Button style={{marginTop:"10px",backgroundColor:"transparent", border:"0.5px solid white"}} onClick={handleSubmit} className="addBoardButton">Submit</Button>
</form>
 
   

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
<div className="container2">
<div className="home_container">

<div className="left_column">

<>
<MDBBtn
       style={{backgroundColor:"transparent",minHeight:"35px",marginBottom:"5px",color:"white", border:"0.5px solid white"}}
      onClick={toggleImport}
    >
      IMPORT
    </MDBBtn>
        <MDBCollapse className ="a" id="basicCollapse2" isOpen={!collapsedImport}>
        {handleImport()}
        </MDBCollapse>
      </>
<>
<MDBBtn
      style={{backgroundColor:"transparent",minHeight:"35px",marginBottom:"5px", color:"white", border:"0.5px solid white"}}
      onClick={toggleNewBoard}
    >
      CREATE NEW BOARD
    </MDBBtn>
        <MDBCollapse className ="a" id="basicCollapse2" isOpen={!collapsedCreate}>
        {renderCreateBoard()}
        
        
        </MDBCollapse>
      </>
<>
<MDBBtn
       style={{backgroundColor:"transparent",minHeight:"35px", color:"white", border:"0.5px solid white"}}
      onClick={toggleNavbar}
    >
      MY BOARDS
    </MDBBtn>
        <MDBCollapse className ="collapseShow" id="basicCollapse2" isOpen={!collapsed}>
          
        {renderBoardsList()} 
        </MDBCollapse>
      </>
     

      
{/*
<Button variant="danger" onClick={() => setImportFile(true)} className="addBoardButton"> Import files </Button>
{importFile === true ? handleImport() : null}
{/*renderCreateBoard()
<Button variant="danger" onClick={() => setCreateBoard(true)} className="addBoardButton"> Create a new Board </Button>
{createBoard === true ? renderCreateBoard() : null} 
*/}

</div>


{/*<div className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle}>
<div className="thumbnails"></div>
</div> */}

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