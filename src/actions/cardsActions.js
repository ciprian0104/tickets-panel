import { CONSTANTS } from "../actions";
import uuid from "uuidv4";


export const addCard = (listID, text, title, priority) => {
  const id = uuid();
  
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {id, text, title, listID, priority}
    };
};


export const editCard = (id, listID, newText, newTitle, newPriority) => {
    return {
      type: CONSTANTS.EDIT_CARD,
      payload: { id, listID, newText, newTitle, newPriority }
    };
  };

  export const deleteCard = (id, listID) => {
    return {
      type: CONSTANTS.DELETE_CARD,
      payload: { id, listID }
    };
  };

  export const importCard = (title, text, priority, listID, id ) => {
  
      return {
          type: CONSTANTS.IMPORT_CARD,
          payload: {title, text, priority, listID, id }
      };
  };