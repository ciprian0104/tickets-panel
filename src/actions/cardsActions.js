import { CONSTANTS } from "../actions";





export const addCard = (listID, text, title,priority) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {text, title, listID,priority}
    };
};

export const editCard = (id, listID, newText, newTitle,newPriority) => {
    return {
      type: CONSTANTS.EDIT_CARD,
      payload: { id, listID, newText, newTitle,newPriority }
    };
  };

  export const deleteCard = (id, listID) => {
    return {
      type: CONSTANTS.DELETE_CARD,
      payload: { id, listID }
    };
  };