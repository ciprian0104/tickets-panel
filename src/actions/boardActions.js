import { CONSTANTS } from "../actions";
import uuid from "uuidv4";
import Store from "../store";

export const setActiveBoard = id => {
  return {
    type: CONSTANTS.SET_ACTIVE_BOARD,
    payload: id
  };
};

export const addBoard = title => {
  const id = uuid();

  return {
    type: CONSTANTS.ADD_BOARD,
    payload: { title, id }
  };
};

export const addImportBoard = (title, id) => {
  return{
    type: CONSTANTS.ADD_IMPORT_BOARD,
    payload:{title, id}
  }
}

export const deleteBoard = boardID => {
      return {
      type:CONSTANTS.DELETE_BOARD,
      payload: boardID,

  };
};
/*
export const exportBoard = boardID => {
  return {
    type: CONSTANTS.EXPORT_BOARD,
    payload: boardID,
  };
};
*/
export function exportBoard() {
/*
  const { store } = Store();
  const items = store.subscribe(() => {
    const state = store.getState();
    console.log("INTERNAL STATE: ",state);
    // do whatever you want with the new state
    return state;
});
*/
  const items = null;
  return {
    type: CONSTANTS.EXPORT_BOARD,
    payload: items,
  }
};

