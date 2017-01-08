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

class Account extends Component {

render() {
    return (
      <Container>
        <Header style={styles.navHeader}>
          <Button transparent onPress={() => Actions.pop()}>
              <Icon name="md-arrow-back"></Icon>
          </Button>
          <Title>Account</Title>
        </Header>

        <Content>
            <Card>
                <CardItem button onPress={() => Actions.change_password()}>
                    <Text>Change password</Text>
                </CardItem>
                <CardItem button onPress={() => Actions.change_email()}>
                    <Text>Change email</Text>
                </CardItem>
                <CardItem button onPress={() => Actions.change_number()}>
                    <Text>Change number</Text>
                </CardItem>
                <CardItem button onPress={() => Actions.delete_account()}>
                    <Text>Delete account</Text>
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
  },
  navHeader: {
    backgroundColor: '#3aaf85'
  }
});

export default connect(stateToProps)(Account);
