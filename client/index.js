import React from 'react';
import { createRoot } from 'react-dom/client';
import store from './store';
import { Provider } from 'react-redux';
import '../public/style.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import history from './history';

const root = createRoot(document.getElementById('app'));
root.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>
);
