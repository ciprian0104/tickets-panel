import { CONSTANTS } from "../actions";





export const addCard = (listID, text, title) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {text, title, listID}
    };
};

export const editCard = (id, listID, newText, newTitle) => {
    return {
      type: CONSTANTS.EDIT_CARD,
      payload: { id, listID, newText, newTitle }
    };
  };

  export const deleteCard = (id, listID) => {
    return {
      type: CONSTANTS.DELETE_CARD,
      payload: { id, listID }
    };
  };