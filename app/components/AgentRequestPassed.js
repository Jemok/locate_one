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

class AgentRequestPassed extends Component {

render() {
    return (
      <Container>
        <Header>
          <Button transparent onPress={() => Actions.pop()}>
              <Icon name="md-arrow-back"></Icon>
          </Button>
          <Title>Request Passed</Title>
        </Header>

        <Content>
          <Text style={styles.requestMessage}>
          Your Agent Request assessment Passed, read the
          terms and conditions for being a Locate agent
          using the link below inorder to continue
          </Text>

         <View style={styles.acceptTerms}>
           <Button success onPress={() => Actions.agent_request_confirmation()}>
            ACCEPT AND CONTINUE
           </Button>
         </View>
         <View style={styles.rejectTerms}>
           <Button warning onPress={() => Actions.agent_request_confirmation()}>
            REJECT AND CANCEL
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
    marginTop: 40,
    marginLeft: 80,
    width: 200
  },
  rejectTerms: {
    marginTop: 20,
    marginLeft: 90,
    width: 200
  }
});

export default connect(stateToProps)(AgentRequestPassed);
