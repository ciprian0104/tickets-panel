import { CONSTANTS } from "../actions";



const initialState = {};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST: {
      const { boardID, id } = action.payload;

      const board = state[boardID];
      const newListID = `list-${id}`;
     const newLists = [...board.lists, newListID];
      board.lists = newLists;
      return { ...state, [boardID]: board };
    }

    case CONSTANTS.DRAG_HAPPENED: {
      const { boardID } = action.payload;
      const board = state[boardID];
      const lists = board.lists;
      const {
        droppableIndexEnd,
        droppableIndexStart,

        type
      } = action.payload;

      // draggin lists around
      if (type === "list") {
        const pulledOutList = lists.splice(droppableIndexStart, 1);
        lists.splice(droppableIndexEnd, 0, ...pulledOutList);
        board.lists = lists;

        return { ...state, [boardID]: board };
      }
      return state;
    }
    case CONSTANTS.DELETE_LIST: {
      const { listID, boardID } = action.payload;
      const board = state[boardID];
      const lists = board.lists;
      const newLists = lists.filter(id => id !== listID);
      board.lists = newLists;
      return { ...state, [boardID]: board };
    }

    case CONSTANTS.ADD_BOARD: {
      const {emoji, title, description, id } = action.payload;
      const newID = `board-${id}`;
      const newBoard = {
        id: newID,
        emoji,
        title,
        description,
        lists: []
      };

      const newState = { ...state, [newID]: newBoard };
      return newState;
    }

    case CONSTANTS.DELETE_BOARD:{
      const {boardID} = action.payload;
      const newState= state;
      delete newState[boardID];

      return newState;
    }

    case CONSTANTS.IMPORT_BOARD: {

      const { id, emoji, title, description, lists } = action.payload;
      const newID = id;
      const newBoard = {
        id: newID,
        emoji,
        title,
        description,
        lists: lists
      };

      const newState = { ...state, [newID]: newBoard };
      return newState;
    }

    case CONSTANTS.EDIT_BOARD: {

      const { id, newEmoji, newTitle, newDescription} = action.payload;

      const board = state[id];
      console.log("STATE OF BOARD ID : ", state[id]);

      board.emoji = newEmoji;
      board.title = newTitle;
      board.description = newDescription;

      return {...state, [`board-${id}`]: board};
    }


    default:
      return state;
  }

};

export default boardsReducer;