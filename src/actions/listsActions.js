import { CONSTANTS } from "../actions";




export const addList = title => {
    return {
        type: CONSTANTS.ADD_LIST,
        payload: title
    };
};
//it should resort the array when we drag and drop
export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId
) => {
    //we will return an object with the type from actions/index.js
    return{
        type:CONSTANTS.DRAG_CONFIRMED,
        payload:{
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId
        }
    }
}