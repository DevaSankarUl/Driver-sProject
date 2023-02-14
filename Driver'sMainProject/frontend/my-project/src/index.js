import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './component/Redux/store'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        <ToastContainer/>
      </PersistGate>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>


);

