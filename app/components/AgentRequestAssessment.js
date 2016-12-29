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

class AgentRequestAssessment extends Component {

render() {
    return (
      <Container>
        <Header>
          <Button transparent onPress={() => Actions.pop()}>
              <Icon name="md-arrow-back"></Icon>
          </Button>
          <Title>Request Assessment</Title>
        </Header>

        <Content>
          <Text style={styles.requestMessage}>
            Thank you for sending a Locate Agent Request:
          </Text>

          <Text style={styles.requestMessage}>
          Your request is being asessed, if you request
          passes, you will get an Agent Parcel dashboard, if
          it fails you will have to send the request another
          time
          </Text>

          <Text style={styles.requestMessage}>
            Your assesment will end on 14th Oct 2016
          </Text>

         <View style={styles.requestView}>
           <Button onPress={() => Actions.shopper_parcel_dashboard()}>
             RETURN TO SHOPPER DASHBOARD
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
  }
});

export default connect(stateToProps)(AgentRequestAssessment);
