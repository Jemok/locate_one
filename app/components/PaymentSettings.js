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

class PaymentSettings extends Component {

render() {
    return (
      <Container>
        <Header>
          <Button transparent onPress={() => Actions.pop()}>
              <Icon name="md-arrow-back"></Icon>
          </Button>
          <Title>Payment settings</Title>
        </Header>

        <Content>
            <Card>
                <CardItem button onPress={() => Actions.change_maximum_amount()}>
                    <Text>Set maximum amount</Text>
                </CardItem>
            </Card>
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
  requestMessage: {
    color: 'gray',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 10,
    textAlign: 'justify'
  },
  requestView: {
    marginTop: 40,
    marginLeft: 35
  }
});

export default connect(stateToProps)(PaymentSettings);
