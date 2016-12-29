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

class Settings extends Component {

render() {
    return (
      <Container>
        <Header>
          <Button transparent onPress={() => Actions.pop()}>
              <Icon name="md-arrow-back"></Icon>
          </Button>
          <Title>Settings</Title>
        </Header>

        <Content>
            <Card>
                <CardItem button onPress={() => Actions.account()}>
                    <Text>Account</Text>
                </CardItem>
                <CardItem button onPress={() => Actions.payment_settings()}>
                    <Text>Payment</Text>
                </CardItem>
                <CardItem button onPress={() =>  Actions.notification_settings()}>
                    <Text>Notification</Text>
                </CardItem>
                <CardItem>
                    <Text>Invite a friend</Text>
                </CardItem>
                <CardItem button onPress={() =>  Actions.change_agent()}>
                    <Text>Lacation and agent</Text>
                </CardItem>
                <CardItem button onPress={() => Actions.about_and_help()}>
                    <Text>About and help</Text>
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

export default connect(stateToProps)(Settings);
