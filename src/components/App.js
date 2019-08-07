import React,{Component} from "react";
import TrelloList from "./TrelloList";
import {connect} from "react-redux";
class App extends Component {
  render(){
    //we will receive the list with this.props
    const {lists}= this.props;
  return (
    <div className="App">
      <h1>The tickets-panel</h1>
      <div style={styles.listsContainer}>
      {
        lists.map(list => <TrelloList title= {list.title}
         cards={list.cards} />)
      }
      </div>
    </div>
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
