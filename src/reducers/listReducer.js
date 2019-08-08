
import { CONSTANTS } from "../actions";


let listID = 2;
let cardID = 3;

const initialState=[
    {
        title:"First Column",
        id: 0,
        cards: [
            {
                id: 0,
                text:" we have for now a static list and a first static card"
            },
            {
                id: 1,
                text: " we have for now a static list and a second static card"
            }
        ]
    },
    {
        title:"Second Column",
        id: 1,
        cards: [
            {
                id: 0,
                text:" we have for now a second static list and a first static card"
            },
            {
                id: 1,
                text: " we have for now a second static list and a second static card"
            },
            {
                id: 2,
                text: "blablabla"
            }
        ]
    },
    {
        title:"Third Column",
        id: 2,
        cards: [
            {
                id: 0,
                text:" we have for now a second static list and a first static card"
            }
         
        ]
    },
];





const listReducer = (state = initialState, action) => {
    switch(action.type){
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: listID
                
            }
            listID += 1
            return [...state, newList];

        case CONSTANTS.ADD_CARD:
            const newCard = {
                text: action.payload.text,
                id: cardID
            }
            cardID += 1;
            
            const newState = state.map(list => {
                if(list.id === action.payload.listID){
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    return list;
                }
            });
            return newState;

        default:
            return state;

        }

    }

    export default listReducer;
