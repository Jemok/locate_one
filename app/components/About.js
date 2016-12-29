import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  ToastAndroid
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Footer,
  Input,
  InputGroup,
  Icon,
  Card,
  CardItem
} from 'native-base';

import { connect } from 'react-redux';

class About extends Component {

render() {
    return (
      <Container>

        <Content>

        <View style={styles.topText}>
          <Text>
            Locate
          </Text>

          <Text>
            Version 1.0
          </Text>

          <Text>
          © 2016 Locate inc
          </Text>
          <Text>
          All rights reserved
          </Text>
        </View>

        </Content>

      </Container>
    )
}
}

const stateToProps = (state) => {
  return {
      locateApplication: state.locateApplication
 	}
}


// Styles
const styles = StyleSheet.create({
  topText: {
    marginTop: 170,
    marginLeft: 100,
    marginRight: 10,
  },
  requestView: {
    marginTop: 40,
    marginLeft: 35
  }
});

export default connect(stateToProps)(About);
