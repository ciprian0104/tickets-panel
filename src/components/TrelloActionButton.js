import React, { Component } from 'react';
import { Icon } from '@material-ui/core';
import Textarea from "react-textarea-autosize";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";
import "./App.css";

/*
import Card from "react-bootstrap/Card"
import "./App.css";
import Form from 'react-bootstrap/Form';
*/


class TrelloActionButton extends Component {

    state = {
        formOpen: false,
        text: ""
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

    handleInputChange = (e) => {
        this.setState({
            text: e.target.value
        })
    };

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

        if (text){
            dispatch(addCard(listID, text))
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

        const placeholder = list ? "Enter list title.." : "Enter title for this card";
        const buttonTitle = list ? "Add List" : "Add Card";



        return (
        <div>
            <Card 
                className="add_card"
            >
                <Textarea 
                placeholder={placeholder} 
                autoFocus 
                onBlur={this.closeForm}
                value={this.state.text}
                onChange={this.handleInputChange}
                className="text_area"
                />

            </Card>
            <div className="formButtonGroup">
                <Button 
                onMouseDown={list ? this.handleAddList : this.handleAddCard}
                variant="contained" 
                className="add_button"
                color="secondary"
                > 
                {buttonTitle}{" "}
                </Button>

                <Icon className="icon"
                > 
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