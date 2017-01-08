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
  List,
  ListItem
} from 'native-base';

import { connect } from 'react-redux';

class AgentRequestConfirmation extends Component {

render() {
    return (
      <Container>
        <Header style={styles.navHeader}>
          <Button transparent onPress={() => Actions.pop()}>
              <Icon name="md-arrow-back"></Icon>
          </Button>
          <Title>Request Confirmation</Title>
        </Header>

        <Content>
          <View>
            <Text style={styles.requestMessage}>
            Locate has received your request, Locate
            will get back to you using the following contact:
            </Text>
          </View>
          <View style={styles.contactDetails}>
            <Text>Number: 0712675071</Text>
            <Text>Email: karokijames40@gmail.com</Text>
          </View>

          <View style={styles.confirmContactDetails}>
            <Button success onPress={() => Actions.agent_request_assessment()}>CONFIRM YOUR CONTACT DETAILS</Button>

            <Text style={styles.newContactMessage}>SET NEW CONTACT DETAILS BELOW</Text>

          </View>

          <View style={styles.newContactDetails}>
            <List>
                  <ListItem>
                      <InputGroup>
                          <Icon name="ios-person" style={{ color: '#3aaf85' }} />
                          <Input placeholder="EMAIL" />
                      </InputGroup>
                  </ListItem>

                  <ListItem>
                        <InputGroup>
                            <Icon name="ios-call" style={{ color: '#3aaf85' }} />
                            <Input placeholder="PHONE" keyboardType="numeric" />
                        </InputGroup>
                    </ListItem>
            </List>

            <Button success onPress={() => Actions.agent_request_assessment()} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
                    SET NEW CONTACT DETAILS
            </Button>
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
  requestMessage: {
    color: 'gray',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 10,
    textAlign: 'justify'
  },
  contactDetails: {
    marginTop: 15,
    marginLeft: 35
  },
  confirmContactDetails: {
    marginTop: 20,
    marginLeft: 35
  },
  newContactMessage: {
    marginTop: 10
  },
  newContactDetails: {
    marginTop: 20,
    width: 300
  },
  navHeader: {
    backgroundColor: '#3aaf85'
  }
});

export default connect(stateToProps)(AgentRequestConfirmation);
