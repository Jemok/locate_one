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

class MpesaConfirmPayment extends Component {

render() {
    return (
      <Container>
        <Header style={styles.navHeader}>
          <Button transparent onPress={() => Actions.pop()}>
              <Icon name="md-arrow-back"></Icon>
          </Button>
          <Title>Confirm Payment</Title>
        </Header>

        <Content>
          <View>
            <Text style={styles.requestMessage}>
            Please confirm that you want to give Locate
            Kshs 4,000 from the number 0712675071
            Mpesa will notify you on your mobile phone,
            you should enter your bonga pin when
            Mpesa sends the notification to your phone, if you dont have a bonga pin
            you will have to generate it by
            dialing *535# on your phone before pressing confirm.
            </Text>

          </View>

          <View style={styles.newContactDetails}>
            <Button success onPress={() => Actions.shopper_parcel_dashboard()} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
                    CONFIRM THIS PAYMENT
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
  moreInfo: {
    color: 'gray',
    marginTop: 5,
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

export default connect(stateToProps)(MpesaConfirmPayment);
