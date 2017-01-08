/**
* Entry point for the Android app.
*/

 import {
   AppRegistry,
 } from 'react-native';

 import LocateWrapper from './wrapper';

/**
* Register our Application main component for Android clients
* The main Application component is called LocateOne
*/
 AppRegistry.registerComponent('LocateOne', () => LocateWrapper);
