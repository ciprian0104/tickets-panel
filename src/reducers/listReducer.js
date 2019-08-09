
import { CONSTANTS } from "../actions";


let listID = 3;//list index
let cardID = 6;//card index

const initialState=[
    {
        title:"First Column",
        id: 'list-${0}',
        cards: [
            {
                id: 'card-${0}',
                text:" we have for now a static list and a first static card"
            },
            {
                id: 'card-${1}',
                text: " we have for now a static list and a second static card"
            }
        ]
    },
    {
        title:"Second Column",
        id: 'list-${1}',
        cards: [
            {
                id: 'card-${2}',
                text:" we have for now a second static list and a first static card"
            },
            {
                id: 'card-${3}',
                text: " we have for now a second static list and a second static card"
            },
            {
                id: 'card-${4}',
                text: "blablabla"
            }
        ]
    },
    {
        title:"Third Column",
        id: 'list-${2}',
        cards: [
            {
                id: 'card-${5}',
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
                id:'list-${listID}'
                
            }
            listID += 1
            return [...state, newList];

        case CONSTANTS.ADD_CARD:
            const newCard = {
                text: action.payload.text,
                id: 'card-${cardID}'
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
