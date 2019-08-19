import React from "react";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Textarea from "react-textarea-autosize";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { CardHeader } from "@material-ui/core";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import "./EditCardForm.css";

//This is the edit form

const EditCardForm = React.memo(
  ({ list, text = "", title="", onChangeText, onChangeTitle, closeForm, children }) => {

  
  const titleholder= list ? "Enter list title..." :"Enter card title:";

  const placeholder = list
    ? "Enter list title..."
    : "Enter a title for this card...";

  const buttonTitle = "Save";

  return (
    <div className="EditCardFormContainer">
        
      <Card className="add_card">
      <TextField
            placeholder={titleholder}

            value={title}
            onChange={e => onChangeTitle(e)}
          />
        <TextField
          placeholder={placeholder}
          value={text}
          onChange={e => onChangeText(e)}
        />
      </Card>
      <div className="buttonContainer">
        {children}

        <Icon className="icon" onMouseDown={closeForm}>close</Icon>
      </div>
    </div>
  );
});

export default EditCardForm;