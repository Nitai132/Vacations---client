import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import reducer from './components/reducers';
import thunk from 'redux-thunk';
import MainImage from './components/main-image';
import RouterWrapper from './components/router-wrapper'
import Footer from './components/footer'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(logger, thunk))
)


function App() {
  return (
    <Provider store = {store}>
      <div className="App">
        <MainImage />
        <RouterWrapper />
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
