import { CONSTANTS } from "../actions";

const initialState = {};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_CARD: {
      const {title, text, priority, listID, id } = action.payload;

      const newCard = {
        title,
        text,
        priority,
        id: `card-${id}`,
        list: listID,
        
      };

      return { ...state, [`card-${id}`]: newCard };
    }
    case CONSTANTS.ADD_IMPORT_CARD: {
      const {title, text, priority, listID, id} = action.payload;
      const newID = id;
      const newCard = {
        title,
        text,
        priority,
        id: newID,
        list: listID,
      };
      return {...state, [newID]: newCard};
    }
    case CONSTANTS.EDIT_CARD: {
      const { id, newTitle, newText, newPriority } = action.payload;
      const card = state[id];
      card.title = newTitle;
      card.text = newText;
      card.priority = newPriority;
      return { ...state, [`card-${id}`]: card };
    }

    case CONSTANTS.DELETE_CARD: {
      const { id } = action.payload;
      const newState = state;
      delete newState[id];
      return newState;

    } 
    
    case CONSTANTS.IMPORT_CARD: {
      const {title, text, priority, listID, id } = action.payload;
      const newID = id;
      const newCard = {
        title,
        text,
        priority,
        id: newID,
        list: listID
      };

      return { ...state, [newID]: newCard };
    }


    default:
      return state;
  }
};

export default cardsReducer;