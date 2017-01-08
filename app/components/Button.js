import React, { Component } from 'react';

import {
  StyleSheet,
  View
} from 'react-native';


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


class ButtonMenu extends Component {



render() {
    return (
      <Button transparent >
          <Icon name="md-arrow-back"></Icon>
      </Button>

    );
  }
}

module.exports = ButtonMenu;
