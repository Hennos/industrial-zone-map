import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import './index.css';

import apollo from './apollo/client';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ApolloProvider client={apollo}>
    <App />
  </ApolloProvider>,  
  document.getElementById('root'),
);

registerServiceWorker();
