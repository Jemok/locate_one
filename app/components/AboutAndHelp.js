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

class AboutAndHelp extends Component {

render() {
    return (
      <Container>
        <Header>
          <Button transparent onPress={() => Actions.pop()}>
              <Icon name="md-arrow-back"></Icon>
          </Button>
          <Title>About and Help</Title>
        </Header>

        <Content>
            <Card>
                <CardItem button onPress={() => Actions.about()}>
                    <Text>About</Text>
                </CardItem>
                <CardItem button onPress={() => Actions.payment_settings()}>
                    <Text>FAQ</Text>
                </CardItem>
                <CardItem button onPress={() =>  Actions.notification_settings()}>
                    <Text>Terms and Privacy Policy</Text>
                </CardItem>
                <CardItem button onPress={() => Actions.contact_locate()} >
                    <Text>Contact Locate</Text>
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

export default connect(stateToProps)(AboutAndHelp);
