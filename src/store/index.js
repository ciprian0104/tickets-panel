import {createStore} from "redux";
import rootReducer from "../reducers";
import { composeWithDevTools } from 'redux-devtools-extension';



import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
    key: 'root',
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
  export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
  }

/*
 const store = createStore(rootReducer, composeWithDevTools());


  export default store;


  */