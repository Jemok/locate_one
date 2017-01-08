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
  Icon
} from 'native-base';

import { connect } from 'react-redux';

class AgentRequestFailed extends Component {

render() {
    return (
      <Container>
        <Header style={styles.navHeader}>
          <Button transparent onPress={() => Actions.pop()}>
              <Icon name="md-arrow-back"></Icon>
          </Button>
          <Title>Request Failed</Title>
        </Header>

        <Content>
          <Text style={styles.requestMessage}>
          OCT 10 2016  Agent request denied
          </Text>

          <Text style={styles.requestMessage}>
            Your Request Failed due to the following reasons:
          </Text>

          <Text style={styles.requestMessage}>
          1. You had insufficient parcel storage space at
            your premises
          </Text>
          <Text style={styles.requestMessage}>
          2. You did not accept the terms and conditions
          </Text>
          <Text style={styles.requestMessage}>
          3. You did not pay the full set up fee
          </Text>

         <View style={styles.acceptTerms}>
           <Button success onPress={() => Actions.agent_request_confirmation()}>
            ACCEPT AND CONTINUE
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
  acceptTerms: {
    marginTop: 30,
    marginLeft: 70,
    width: 200
  },
  navHeader: {
    backgroundColor: '#3aaf85'
  }
});

export default connect(stateToProps)(AgentRequestFailed);
