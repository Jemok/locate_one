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

class NotificationSettings extends Component {

render() {
    return (
      <Container>
        <Header style={styles.navHeader}>
          <Button transparent onPress={() => Actions.pop()}>
              <Icon name="md-arrow-back"></Icon>
          </Button>
          <Title>Notification settings</Title>
        </Header>

        <Content>
            <Card>
                <CardItem button onPress={() => Actions.sms_notification()}>
                    <Text>SMS notifications</Text>
                </CardItem>
                <CardItem button onPress={() => Actions.email_notification()}>
                    <Text>Email notifications</Text>
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

export default connect(stateToProps)(NotificationSettings);
