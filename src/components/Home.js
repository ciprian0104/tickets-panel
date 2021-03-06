import React, { useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { MDBBtn, MDBCollapse } from "mdbreact";



library.add(faTrash, faGrinAlt, faEdit);
const Home = ({boardID, boards, boardOrder, dispatch }) => {
  // this is the home site that shows you your boards and you can also create a Board here.
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [boardDesc, setBoardDesc] = useState("");
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
  
  if(board){
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
      <h4 style={{color:"white"}}>Description:</h4>
      <p style={{color:"white", font:"serif", fontSize:"23px"}}>{board.description}</p>
    </div>
    </div>
  
  
    );

  } else {
    return null;
  }

}


  const handleChangeTitle = e => {
    setNewBoardTitle(e.target.value);
  };

  const handleChangeDesc = e => {
    setBoardDesc(e.target.value);
  }



  const handleSubmit = e => {
    setCreateBoard(false);
    setIsEmojing(false);
    e.preventDefault();
    
    if(newBoardTitle && boardDesc){
      
      dispatch(addBoard(emojiState, newBoardTitle, boardDesc));
      setNewBoardTitle("");
      setBoardDesc("");
      setEmoji({});
      toggleNewBoard();
    
    }else{
      return;
    }
  };



  const renderEmojis = (e) => {
      return (
        <Picker onClick={(emoji) => setEmoji(emoji)} title='Pick your emoji…' emoji='point_up' 
        />
      )
    }
    
  const BoardThumbnail = ({ id, title, emoji },{handleDeleteBoard}) => {



      return (
        <div style={{display:"flex" ,flexDirection:"row", cursor:"pointer", justifyContent:"center", marginTop:"7px"}} >
          <div onClick={() => thumbnailDispatch(id)} style={{display:"flex" ,flexDirection:"row", cursor:"pointer", left:"100px"}}>
          <div className="emoji_styling">
          <Emoji emoji={emoji} size={32} />
          </div>
          <h4 className="titleBoard">{title}</h4>
          </div>
          <div style={{marginTop:"9px", marginLeft:"10px"}}>
          <FontAwesomeIcon className="icon_delete" color="white" size="1x" icon="trash" onMouseDown={handleDeleteBoard} />
          </div>
        </div>
      );
    };
    



const renderBoardsList = () => {
  return boardOrder.map(boardID => {
    const board = boards[boardID];

    const handleDeleteBoard = () =>{
      dispatch(deleteBoard(boardID={boardID}));
    }
  return (
    <div style={{minWidth:"355px", maxWidth:"355px"}} key={boardID}>


{BoardThumbnail({ ...board },{handleDeleteBoard})} 
</div>


);

    
});
};


const renderCreateBoard = () => {
  return (
  <div style={{display:"inlineBlock", maxWidth:"300px"}}>
  
  
  <h5 style={{color:"white"}}>Create form</h5>
  <form onSubmit={handleSubmit} >

  <input
    className="create_input"
    onChange={handleChangeTitle}
    value={newBoardTitle}
    placeholder="Your boards title..."
    type="text"
  />
  <Form>
    <Form.Group>
      <Form.Label style={{color:"white",fontSize:"20px",fontStyle:"bold"}}>Board description</Form.Label>
      <Form.Control as="textarea" maxLength="255" style={{width:"350px"}} rows="3"
                    placeholder="Enter board description" onChange={handleChangeDesc}
                    value={boardDesc}
       />
    </Form.Group>
  </Form>
  {renderEmojis()}
  <div style = {{display:"flex", flexDirection:"row"}}>

  <Button style={{marginTop:"10px",backgroundColor:"transparent", border:"0.5px solid white", marginRight:"30px"}} onClick={handleSubmit} className="addBoardButton">Submit</Button>
  <Emoji emoji={emojiState} size={64} />
  </div>

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
     

</div>

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