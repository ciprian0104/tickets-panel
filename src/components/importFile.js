
import React from 'react'
import Button from "react-bootstrap/Button";
import { useStore } from 'react-redux'


const ImportFile = ({ importBoard, importList, importCard, dispatch }) => {
    
    let storeState = useStore().getState();
    let fileReader;
    let data;
    let boardsIds = [];

    const handleFileRead = e => {
        const content = fileReader.result;
        const parsedContent = JSON.parse(content);
        data = parsedContent;
        
    }

    const handleUniqueBoard = id => {
      const storeBoards = storeState.boards;
      for(let i in storeBoards){

        boardsIds.push(storeBoards[i].id);
      }

      for( let j in boardsIds){

        if( id === boardsIds[j]){
          return false;
        }
      }
      return true;
    }

    const handleFileChosen = file => {

        fileReader = new FileReader();

        fileReader.onloadend = handleFileRead;

        fileReader.readAsText(file);
    };

    const handleImportBoard = (e) => {
        let notImported = handleUniqueBoard(data.boards.id);


        if(notImported === true){


        
        dispatch(importBoard(data.boards.id, data.boards.title, data.boards.lists ));
      
        
        for(let i in data.lists){
          dispatch(importList(data.lists[i].title , data.lists[i].id, data.lists[i].cards));
          console.log("List ", i, " is: ", data.lists[i])
        };
      
        for(let j in data.cards){
      
          for(let p in data.cards[j]){
            if(data.cards[j] !== null){
              dispatch(importCard( data.cards[j][p].title, data.cards[j][p].text, data.cards[j][p].priority, data.cards[j][p].list, data.cards[j][p].id ))
              console.log("Cards lists of [", j,"][", p, "] is: ", data.cards[j][p])

             };
          }
      
        };

      }else{
        console.log("Duplicate ");
        window.alert("Duplicate board! ");

      }
        };
    return (
        <div>
            <input 
            type='file'
            id = 'file'
            className="input-file"
            accept='.json'
            onChange={e => handleFileChosen(e.target.files[0])}
            />
        <Button variant="danger" onClick={handleImportBoard}>Import</Button>

        </div>
    )



}

export default ImportFile;
