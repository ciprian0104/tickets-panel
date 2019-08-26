import { CONSTANTS } from "../actions";


const initialState = [];

const listOrderReducer = (state = initialState, action) => {
  switch (action.type) {    
    
    case CONSTANTS.DELETE_LIST: {
        const { listID } = action.payload;
        return state.filter(id => id !== listID);
  }
    default:
        return state;
}
};
export default listOrderReducer;