import React from "react";
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import "./EditCardForm.css";
import { ContextMenuTrigger } from "react-contextmenu";

//This is the edit form

const EditCardForm = React.memo(
  ({ list, text = "", title="",priority="" , onChangeText, onChangeTitle, onChangePriority,closeForm, children }) => {

  
  const titleholder= list ? "Enter list title..." :"Enter card title:";

  const placeholder = list
    ? "Enter list title..."
    : "Enter a title for this card...";


  return (
    <div className="EditCardFormContainer">
        
      <Card className="add_card">
      <TextField
            placeholder={titleholder}
            style={{width:"440px",height:"24px"}}
            value={title}
            onChange={e => onChangeTitle(e)}
          />
        <TextField
          placeholder={placeholder}
          style={{width:"440px",height:"24px"}}
          value={text}
          onChange={e => onChangeText(e)}
        />
        <ContextMenuTrigger id="colorsMenu">

      <div className="colorMenuButton">Priority</div>
      </ContextMenuTrigger>

      <select style={{width:"440px",height:"24px"}} defaultValue={priority} onChange={e=> onChangePriority(e)}
                className="form-control">
                    <option></option>
                    <option value={'red'}>High</option>
                    <option value={'yellow'}>Medium</option>
                    <option value={'green'}>Low</option>
                    </select>


      

      </Card>
      <div className="buttonContainer">
        {children}

        <Icon className="icon" onMouseDown={closeForm}>close</Icon>
      </div>
    </div>
  );
});

export default EditCardForm;