import { CONSTANTS } from "../actions";
import uuid from "uuidv4";






export const addCard = (listID, text, title, priority) => {
    return {

        type: CONSTANTS.ADD_CARD,
        payload: {text, title, listID, priority}
    };
};