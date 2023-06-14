import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ProductsReducer} from "./Redux/ProductsReducer";
import {createStore} from "redux";
import {Provider} from "react-redux";

const store = createStore(ProductsReducer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

