/**
* A Redux wrapper for our application components
**/

// Imports
import React, { Component } from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './app/reducers';
import LocateOne from './app/app';
import configureStore from './app/store';
import { ApplicationStates, setApplicationStatus } from './app/actions';

import { View, Text } from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

//const store = configureStore();

// Constants
// const logger = createLogger();
// const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
// const store = createStoreWithMiddleware(rootReducer);

// Log the initial state
//console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// )

// Stop listening to state updates
//unsubscribe()

// const LocateWrapper = () => {
//     return (
//       <Provider store={store}>
//         <LocateOne />
//       </Provider>
//     )
// }

class LocateWrapper extends Component {

  constructor(props) {
     super(props);
     this.state = {
       isLoading: true,
       store: configureStore(() => this.setState({ isLoading: false })),
     };
   }

  render() {

      if (this.state.isLoading){
         console.log('hydrating the store');
         return (
           <View style={{ flex: 1 }}>
            <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
            </View>
         );
      }
     return (
       <Provider store={this.state.store}>
         <LocateOne />
       </Provider>
     )
   }
}

export default LocateWrapper;
