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

class MpesaConfirmNumber extends Component {

render() {
    return (
      <Container>
        <Header style={styles.navHeader}>
          <Button transparent onPress={() => Actions.pop()}>
              <Icon name="md-arrow-back"></Icon>
          </Button>
          <Title>Confirm Number</Title>
        </Header>

        <Content>
          <View>
            <Text style={styles.requestMessage}>
            Please confirm that you want to pay Kshs
            4,000 using the number 0712675071
            or you can use a different number, set it
            below:
            </Text>

          </View>

          <Button success onPress={() => Actions.mpesa_confirm_payment()} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10 }}>
               CONFIRM AND CONTINUE
          </Button>

          <View style={styles.newContactDetails}>
            <List>
                  <ListItem>
                      <InputGroup>
                          <Icon name="md-call" style={{ color: '#3aaf85' }} />
                          <Input placeholder="New number" />
                      </InputGroup>
                  </ListItem>

                  <ListItem>
                        <InputGroup>
                            <Icon name="md-call" style={{ color: '#3aaf85' }} />
                            <Input placeholder="Confirm number" />
                        </InputGroup>
                  </ListItem>
            </List>

            <Button success onPress={() => Actions.mpesa_confirm_payment()} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
                    SET PAYMENT NUMBER
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

export default connect(stateToProps)(MpesaConfirmNumber);
