import React, { Component } from 'react';
import { Icon, TextField } from '@material-ui/core';
import Textarea from "react-textarea-autosize";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";
import "./App.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";


class TrelloActionButton extends Component {
  

state = {
    formOpen: false,
    text: "",
    title: "",
    priority: "green",
};
handleClickNormal = () => {
    return this.setState({priority: "green"});

}
handleClickHigh = () => {
    return this.setState({priority: "red"});
  };
  handleClickMedium = () => {
    return this.setState({priority: "yellow"});
  };
openForm = () => {
    this.setState({
    formOpen: true
});
};

closeForm = e => {
    this.setState({
    formOpen: false
});
};




handleInputChange(property) {
        return e => {
          this.setState({
            [property]: e.target.value
          });
        };
      }
   
handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;

if (text) {
    dispatch(addList(text));
}


return;
};




handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text } = this.state;
    const { title } =this.state;
    const { priority } = this.state;


if (text && title){
    dispatch(addCard(listID, text, title, priority));


}

};


renderAddButton = () => {
    const { list } = this.props;


    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity= list ? 1 : 0.5;
    const buttonTextColor= list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

return (
    <div
        onClick={this.openForm}
        className="openFormButtonGroup"
        style={{
        capacity: buttonTextOpacity, 
        color: buttonTextColor, 
        background: buttonTextBackground
}}
    >
    <Icon>add</Icon>
    <p>{buttonText}</p>
    </div>
);

};

    renderForm = () => {

    const {list} = this.props;
    const titleholder = list ? "" :"Enter card title:";
    const placeholder = list ? "Enter list title.." : "Enter content for this card";
    const buttonTitle = list ? "Add List" : "Add Card";


    return (
    <div>
    <Card 
    className="add_card"
    >
    <form>

    <TextField
    placeholder={titleholder}
    
    value={this.state.title}
    onChange={this.handleInputChange('title')}
    className= {(buttonTitle === "Add List") ? "ghost" : "none"}
    />
<Textarea 
    placeholder={placeholder} 

    value={this.state.text}
    onChange={this.handleInputChange('text')}

    className="text_area"
    />


<div className= {(buttonTitle === "Add Card") ? "parentDiv" : "ghost" }>
 
 <ContextMenuTrigger id="colorsMenu">
   
   <div className="colorMenuButton">Priority</div>
 </ContextMenuTrigger>

 <ContextMenu id="colorsMenu" className="react-contextmenu">

   <MenuItem className="react-contextmenu-item" onClick={(this.handleClickHigh)}>
     High
   </MenuItem>
   <MenuItem  className="react-contextmenu-item" onClick={this.handleClickMedium}>
     Medium
   </MenuItem>
   <MenuItem  className="react-contextmenu-item" onClick={this.handleClickNormal}>
     Normal
   </MenuItem>
 </ContextMenu>

</div>



    </form>
    </Card>
    <div className="formButton">
    <Button 
    onMouseDown={list ? this.handleAddList : this.handleAddCard}
    variant="contained" 
    className="add_button"


    > 
    {buttonTitle}{" "}
    </Button>

    <Icon className="icon" onClick={this.closeForm}> 
        close
    </Icon>
</div>

</div>
);


};


render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton()
}
}





export default connect()(TrelloActionButton);