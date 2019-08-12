
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
                title:"title",
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

        case CONSTANTS.ADD_CARD:{
            const newCard = {
                title:action.payload.title,
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
        }
        case CONSTANTS.DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type
            } = action.payload;

            const newState = [...state];
            // Dragging the lists

            if(type === "list"){
                const list = newState.splice(droppableIndexStart, 1);
                newState.splice(droppableIndexEnd, 0, ...list);
                return newState;
            }


            //If they are in the same list
            if (droppableIdStart === droppableIdEnd)  {
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);


            }

            if (droppableIdStart !== droppableIdEnd) {
                const listStart = state.find(list => droppableIdStart === list.id);

                const card = listStart.cards.splice(droppableIndexStart, 1);

                const listEnd = state.find(list => droppableIdEnd === list.id);

                listEnd.cards.splice(droppableIndexEnd, 0, ...card)
            }



            return newState;
        default:
            return state;

        }

    }

    export default listReducer;