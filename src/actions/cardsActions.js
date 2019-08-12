import { CONSTANTS } from "../actions";




export const addCard = (listID, text,title) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {text, listID,title}
    };
};