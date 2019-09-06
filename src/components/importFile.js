import React from 'react'
import Button from "react-bootstrap/Button";


const ImportFile = ({boardIds, importBoard, importList, importCard, dispatch }) => {
    
    let fileReader;
    let data;
    const handleFileRead = e => {
        let content = fileReader.result;
        const parsedContent = JSON.parse(content);
        data = parsedContent;
        content = null;
      }

    const handleUniqueBoard = id => {
      for( let j in boardIds){

        if( id === boardIds[j]){
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
      document.getElementById("file").value = "";

        if(data){
        
        let notImported = handleUniqueBoard(data.boards.id);


        if(notImported === true){


        
        dispatch(importBoard(data.boards.id, data.boards.emoji, data.boards.title, data.boards.description, data.boards.lists ));
      
        
        for(let i in data.lists){
          dispatch(importList(data.lists[i].title , data.lists[i].id, data.lists[i].cards));
        };
      
        for(let j in data.cards){
      
          for(let p in data.cards[j]){
            if(data.cards[j] !== null){
              dispatch(importCard( data.cards[j][p].title, data.cards[j][p].text, data.cards[j][p].priority, data.cards[j][p].list, data.cards[j][p].id ))

             };
          }
      
        };

      }else{
        console.log("Duplicate ");
        window.alert("Duplicate board! ");

      }
       
    } };
    return (
        <div>
            <input 
            type='file'
            id = 'file'
            className="input-file"
            accept='.json'
            onChange={e => handleFileChosen(e.target.files[0])}
            style={{maxWidth:"200px",color:"white",marginRight:"45px"}}
            />
        <Button style={{backgroundColor:"transparent", border:"0.5px solid white", marginBottom:"5px"}} onClick={handleImportBoard}>Import</Button>

        </div>
    )



}

export default ImportFile;
