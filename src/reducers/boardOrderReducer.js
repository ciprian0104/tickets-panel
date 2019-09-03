import { CONSTANTS } from "../actions";


const initialState = [];

const boardOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_BOARD: {

      return [...state, `board-${action.payload.id}`];
    }

    case CONSTANTS.ADD_IMPORT_BOARD: {
      return [...state, action.payload.id];
    }


    case CONSTANTS.IMPORT_BOARD: {

      return [...state, action.payload.id];
    }

    case CONSTANTS.DELETE_BOARD: {
      const { boardID } = action.payload;
      return state.filter(id => id !== boardID);
    }


    default:
      return state;
  }
};  


export default boardOrderReducer;