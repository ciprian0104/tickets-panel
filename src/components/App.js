import React,{Component} from "react";
import TrelloList from "./TrelloList";
import {connect} from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import {DragDropContext} from "react-beautiful-dnd";

class App extends Component {
  onDragEnd=()=>{
    
  };
  render(){
    //we will receive the list with this.props
    const {lists}= this.props;
    

  return (
    <DragDropContext onDragEnd={this.onDragEnd}>
    <div className="App">
      <h1>The tickets-panel</h1>
      <div style={styles.listsContainer}>
      {
        lists.map(list => <TrelloList listID={list.id} key={list.id} title= {list.title}
         cards={list.cards} />)
      }
      <TrelloActionButton list />
      </div>
    </div>
    </DragDropContext>
  );
  }
}
const styles ={
  listsContainer:{
    display:"flex",
    flexDirection: "row",
   
  }
};
const mapStateToProps = state => (
  {
    lists: state.lists//state.lists come from indexReducers
  }
);
export default connect(mapStateToProps) (App);
