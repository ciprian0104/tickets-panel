import React, { Component } from 'react';
import { Icon, TextField } from '@material-ui/core';
import Textarea from "react-textarea-autosize";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";
import "./App.css";
import "./App.css";



class TrelloActionButton extends Component {

state = {
    formOpen: false,
    text: "",
    title: ""
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
    const {title} =this.state;


if (text){
    dispatch(addCard(listID, text, title));

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
    const titleholder= list ? "" :"Enter card title:";
    const placeholder = list ? "Enter list title.." : "Enter content for this card";
    const buttonTitle = list ? "Add List" : "Add Card";



    return (
    <div>
    <Card 
    className="add_card"
    >
    <form onBlur={this.closeForm} autoFocus>
    <TextField
    placeholder={titleholder}


    value={this.state.title}
    onChange={this.handleInputChange('title')}
    />
<Textarea 
    placeholder={placeholder} 

    value={this.state.text}
    onChange={this.handleInputChange('text')}

    className="text_area"
    />
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

    <Icon className="icon"> 
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