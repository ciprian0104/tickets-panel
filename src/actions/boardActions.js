import { CONSTANTS } from "../actions";
import uuid from "uuidv4";

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

export const deleteBoard = boardID => {

  return {
      type: CONSTANTS.DELETE_BOARD,
      payload: boardID
  };

};
