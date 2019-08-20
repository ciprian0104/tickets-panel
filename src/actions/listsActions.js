import { CONSTANTS } from "../actions";

import uuid from "uuidv4";


export const addList = title => {
  const id = uuid();
    return {
        type: CONSTANTS.ADD_LIST,
        payload: {title, id}
    };
};

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type

) => {
    return {
        type: CONSTANTS.DRAG_HAPPENED,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            type
        }
    };
};

export const deleteList = listID => {
    return {
      type: CONSTANTS.DELETE_LIST,
      payload: {
        listID
      }
    };
  };

export const editTitle = (listID, newTitle) => {
    return {
      type: CONSTANTS.EDIT_LIST_TITLE,
      payload: {
        listID,
        newTitle
      }
    };
  };