import React from "react";
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";
import { TextField } from "@material-ui/core";
import './App.css';
import './EditCardForm.css';


//Changed from TrelloActionButton

class CreateCardForm extends React.Component {
  state = {
    formOpen: false,
    title: "",
    text: "",
    priority:"green",
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
  //handlers for the selector
  handleClickNormal = () => {
    return this.setState({priority: "green"});

    }
  handleClickHigh = () => {
    return this.setState({priority: "red"});
  };
  handleClickMedium = () => {
    return this.setState({priority: "yellow"});
  };
  handleChangePriority = (e) => {
    return this.setState({priority:e.target.value});
  }


  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.value });
  };
  
  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: ""
      });
      dispatch(addList(text));
    }

    return;
  };

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text } = this.state;
    const { title } = this.state;
    const {priority}= this.state;

    if (text && title) {
      this.setState({
        title: "",
        text: "",
        priority:"",
      });
      dispatch(addCard(listID, title, text,priority));
    }
  };

  renderAddButton = () => {
    const { list } = this.props;

    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
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
    const { list } = this.props;

    const secondPlaceholder = list
    ? ""
    : "Enter card description";


    const placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";

    const buttonTitle = list ? "Add List" : "Add Card";


    return (
      <div>
        <form onBlur={this.closeForm}>

        <Card className="add_card">

           <TextField
            placeholder={placeholder}
            value={this.state.text}
            onChange={this.handleChange('text')}
          />
        


        <TextField
            placeholder={secondPlaceholder}
            value={this.state.title}
            onChange={this.handleChange('title')}
          />

        </Card>

        <div className="buttonContainer">
          <Button style={{color: 'white', background: '#5aac44'}}
            onMouseDown={list ? this.handleAddList : this.handleAddCard}
            variant="contained"
            children={buttonTitle}
          />

          <Icon className="icon" onClick={this.closeForm}>close</Icon>
          {/*priority selector form */}
          <div className= {(buttonTitle === "Add Card") ? "parentDiv" : "ghost" }>
          
          <select defaultValue="" onChange={this.handleChangePriority}
                className="form-control">
                    <option></option>
                    <option value={'red'}>High</option>
                    <option value={'yellow'}>Medium</option>
                    <option value={'green'}>Low</option>
                    </select>
          </div>

        </div>
        </form>

      </div>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

export default connect()(CreateCardForm);
