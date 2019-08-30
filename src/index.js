import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import Store from "./store";
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PersistGate } from 'redux-persist/integration/react';


const { store, persistor } = Store();

     /*
     
     */

/*<PersistGate loading={null} persistor={persistor}>
    </PersistGate>
*/


ReactDOM.render(<Provider store={store}>
    {console.log(store.getState())}
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();