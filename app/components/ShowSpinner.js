import React, { Component } from 'react';

import {
  StyleSheet,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Footer,
  Icon,
  CheckBox
} from 'native-base';

import Spinner from 'react-native-loading-spinner-overlay';

class ShowSpinner extends Component {

  constructor(props) {
  super();
  this.state = {
    visible: false
  };
}
/* eslint react/no-did-mount-set-state: 0 */
componentDidMount() {

  this.timer =  setTimeout(this.setState({
        visible: !this.state.visible
      }),
     3000)


    clearTimeout(this.timer);

    Actions.what_is_locate();

}


render() {
    return (
      <View style={{ flex: 1 }} >
        <Spinner visible={this.state.visible}  textStyle={{color: '#FFF'}} overlayColor="blue"  />
      </View>

    );
  }
}

module.exports = ShowSpinner;
