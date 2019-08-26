import {combineReducers} from "redux";  
import listReducer from "./listReducer";
import listOrderReducer from "./listOrderReducer";
import cardsReducer from "./cardsReducer";

export default combineReducers(
    {
        lists: listReducer,
        cards: cardsReducer,
        listOrder: listOrderReducer,

    }
);