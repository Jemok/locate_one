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

class SendAgentRequest extends Component {

render() {
    return (
      <Container>
        <Header style={styles.navHeader}>
          <Button transparent onPress={() => Actions.pop()}>
              <Icon name="md-arrow-back"></Icon>
          </Button>
          <Title>Agent Request</Title>
        </Header>

        <Content>
          <Text style={styles.requestMessage}>
          Send this request to become a locate agent, your business
          premis will be used as parcel pick up point, Locate will get
          back to you after you send the request
          </Text>

         <View style={styles.requestView}>
           <Button success onPress={() => Actions.agent_request_confirmation()}>
             REQUEST TO BE A LOCATE AGENT
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
  requestView: {
    marginTop: 40,
    marginLeft: 35
  },
  navHeader: {
    backgroundColor: '#3aaf85'
  }
});

export default connect(stateToProps)(SendAgentRequest);
