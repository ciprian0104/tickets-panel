import React,{Component} from "react";
import TrelloList from "./TrelloList";
import {connect} from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import {DragDropContext} from "react-beautiful-dnd";
import {sort} from "../actions";
import "./App.css";


class App extends Component {
  //it will receive a prop
  onDragEnd=(result)=>{
    //we create a redux action
    const { destination, source , draggableId}=result;
    
    if(!destination){
      return;//if we drag and drop the card outside of the lists
      // it should do nothing
    }
    //but if it is a destination, we will run the operation
    //we will call de sort action from actions/index.js
    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
    )
  );

  };
  render(){
    //we will receive the list with this.props
    const {lists}= this.props;
    

  return (
    <DragDropContext onDragEnd={this.onDragEnd}>
    <div className="App">
      <h1>The tickets-panel</h1>
     {/* <div style={styles.listsContainer}>*/}
     <div className="listContainer">
      {
        lists.map(list => 
        <TrelloList 
          listID={list.id} 
          key={list.id} 
          title= {list.title}
          cards={list.cards} />)
      }
      <TrelloActionButton list />
      </div>
    </div>
    </DragDropContext>
  );
  }
}

const mapStateToProps = state => (
  {
    lists: state.lists//state.lists come from indexReducers
  }
);
export default connect(mapStateToProps) (App);
