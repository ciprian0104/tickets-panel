import {combineReducers} from "redux";  
import listReducer from "./listReducer";
import boardsReducer from "./boardsReducer";
import boardOrderReducer from "./boardOrderReducer";
import activeBoardReducer from "./activeBoardReducer";
import cardsReducer from "./cardsReducer";


export default combineReducers(
    {
        lists: listReducer,
        cards: cardsReducer,
        boards: boardsReducer,
        boardOrder: boardOrderReducer,
        activeBoard: activeBoardReducer

    }
);