import { CONSTANTS } from "../actions";
import uuid from "uuidv4";

export const setActiveBoard = id => {
  return {
    type: CONSTANTS.SET_ACTIVE_BOARD,
    payload: id
  };
};

export const addBoard = (emoji, title) => {
  const id = uuid();

  return {
    type: CONSTANTS.ADD_BOARD,
    payload: {emoji, title, id }
  };
};


export const deleteBoard = boardID => {
      return {
      type:CONSTANTS.DELETE_BOARD,
      payload: boardID,

  };
};

export const importBoard = (id, emoji, title, lists) => {

  return {
    type: CONSTANTS.IMPORT_BOARD,
    payload: { id, emoji, title, lists }
  };
};

export const editBoard = (id, newEmoji, newTitle) =>{

  return {
    type: CONSTANTS.EDIT_BOARD,
    payload: {id, newEmoji, newTitle}
  };
};