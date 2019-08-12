import React,{Component} from "react";
import TrelloList from "./TrelloList";
import {connect} from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import { sort } from '../actions';
import "./App.css"
import SimpleAppBar from "./SimpleAppBar";

class App extends Component {
  onDragEnd=(result)=>{
    const {destination, source, draggableId, type} = result;
    
    if(!destination){
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
      };

  render(){
    //we will receive the list with this.props
    const {lists}= this.props;
    

  return (
    <DragDropContext onDragEnd={this.onDragEnd}>
    <div className="background">
      <SimpleAppBar />
      <Droppable droppableId="all-lists" direction="horizontal" type="list">

      {
        provided => (
        <div className="listContainer"{...provided.droppableProps} ref={provided.innerRef}>
        {
          lists.map( (list, index) => <TrelloList listID={list.id} key={list.id} title= {list.title}
           cards={list.cards} index={index}/>)
        }
        <TrelloActionButton list />
         </div>)
      }

      </Droppable>




    

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