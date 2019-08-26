
import React, { PureComponent } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import CreateCardForm from "./CreateCardForm";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../actions";
import SimpleAppBar from './SimpleAppBar';
import './App.css';
import Routes from "../routes";


class App extends PureComponent {
  render() {
    return <Routes />;
  }
}
export default App;
