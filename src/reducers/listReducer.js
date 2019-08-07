
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
        id: 0,
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
        id: 0,
        cards: [
            {
                id: 0,
                text:" we have for now a second static list and a first static card"
            }
         
        ]
    },
];

const listReducer = (state = initialState,action) => {
    switch(action.type){
        default:
            return state;
    }
}

export default listReducer;