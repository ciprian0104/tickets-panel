import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk"


import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
    key: 'root',
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
  export default () => {
    let store = createStore(persistedReducer,applyMiddleware(thunk));
    let persistor = persistStore(store);
    return { store, persistor }
  }

/*
 const store = createStore(rootReducer, composeWithDevTools());


  export default store;


  */