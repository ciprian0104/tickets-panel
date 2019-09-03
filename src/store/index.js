import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

import { persistStore, persistReducer, autoRehydrate, purgeStoredState } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default localStorage for web


const persistConfig = {
    key: 'root',
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
  export default () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk));
    
    let persistor = persistStore(store);



    //var myJSON =JSON.stringify(obj);
    //console.log(myJSON);
      return { store, persistor }
  };



/*
 const store = createStore(rootReducer, composeWithDevTools());


  export default store;

*/
