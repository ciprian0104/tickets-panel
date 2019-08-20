import { CONSTANTS } from "../actions";


//let listID = 3;//list index
//let cardID = 6;//card index

const initialState=[];



const listReducer = (state = initialState, action) => {
switch(action.type){
    case CONSTANTS.ADD_LIST:
      const { title, id } = action.payload; 
        const newList = {
        title: title,
        cards: [],
        id:`list-${id}`

}
    console.log("LIST ID: ", id);
    return [...state, newList];

    case CONSTANTS.ADD_CARD:{
        const newCard = {
        title:action.payload.title,
        text: action.payload.text,
        priority:action.payload.priority,
        id: `card-${action.payload.id}`
        }
        console.log(action.payload.id);
        //cardID += 1;

    const newState = state.map(list => {
    if(list.id === action.payload.listID){
    return {
    ...list,
    cards: [...list.cards, newCard]
    }
    } else {
    return list;
    }
    });
    return newState;
    }
    case CONSTANTS.DRAG_HAPPENED:
    const {
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    type
    } = action.payload;

    const newState = [...state];
    // Dragging the lists

    if(type === "list"){
    const list = newState.splice(droppableIndexStart, 1);
    newState.splice(droppableIndexEnd, 0, ...list);
    return newState;
}


//If they are in the same list
if (droppableIdStart === droppableIdEnd) {
    const list = state.find(list => droppableIdStart === list.id);
    const card = list.cards.splice(droppableIndexStart, 1);
    list.cards.splice(droppableIndexEnd, 0, ...card);


}

if (droppableIdStart !== droppableIdEnd) {
    const listStart = state.find(list => droppableIdStart === list.id);

    const card = listStart.cards.splice(droppableIndexStart, 1);

    const listEnd = state.find(list => droppableIdEnd === list.id);

    listEnd.cards.splice(droppableIndexEnd, 0, ...card)
}



    return newState;


    case CONSTANTS.EDIT_CARD: {
        const { id, listID, newText, newTitle, newPriority } = action.payload;
        return state.map(list => {
          if (list.id === listID) {
            const newCards = list.cards.map(card => {
              if (card.id === id) {
                card.text = newText;
                card.title = newTitle;
                card.priority=newPriority;
                console.log(card.text);
                console.log(card.priority);
                return card;
              }
              return card;
            });
            return { ...list, cards: newCards };
          }
          return list;
        });
      }
  
      case CONSTANTS.DELETE_CARD: {
        const { id, listID } = action.payload;
        return state.map(list => {
          if (list.id === listID) {
            const newCards = list.cards.filter(card => card.id !== id);
            return { ...list, cards: newCards };
          } else {
            return list;
          }
        });
      }

      case CONSTANTS.DELETE_LIST: {
        const { listID } = action.payload;
        return state.filter(list => list.id !== listID);
      }
  
  
      case CONSTANTS.EDIT_LIST_TITLE: {
        const { listID, newTitle } = action.payload;
        return state.map(list => {
          if (list.id === listID) {
            list.title = newTitle;
            return list;
          } else {
            return list;
          }
        });
      }


    default:
    return state;

}

}

export default listReducer;