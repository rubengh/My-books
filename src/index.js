import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import 'typeface-roboto';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./js/store/index";
import index from "./js/index"; // Importante, sin este import REDUX no funciona

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
    ), document.getElementById('root'));

registerServiceWorker();