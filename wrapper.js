
import React, { Component } from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './app/reducers';
import LocateOne from './app/app';

import { ApplicationStates, setApplicationStatus } from './app/actions';


const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const store = createStoreWithMiddleware(rootReducer);

// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// )

// Dispatch some actions
// store.dispatch(setApplicationStatus(ApplicationStates.OLD))

// Stop listening to state updates
// unsubscribe()
const LocateWrapper = () => {
    return (
      <Provider store={store}>
        <LocateOne />
      </Provider>
    )
}

export default LocateWrapper;
