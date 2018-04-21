import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  applyMiddleware
} from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import rootReducer from './reducers';
import rootEpic from './epics';

import './index.css';

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
