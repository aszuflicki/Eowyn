import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

const layout = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(layout, document.getElementById('app'));
