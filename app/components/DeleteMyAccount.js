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

class DeleteMyAccount extends Component {

render() {
    return (
      <Container>
        <Header style={styles.navHeader}>
          <Button transparent onPress={() => Actions.pop()}>
              <Icon name="md-arrow-back"></Icon>
          </Button>
          <Title>Delete account</Title>
        </Header>

        <Content>
          <View>
            <Text style={styles.requestMessage}>
              Deleting your account will:
            </Text>
            <Text style={styles.moreInfo}>
            Delete your account from Locate
            </Text>
            <Text style={styles.moreInfo}>
            Erase your Locate parcel history
            </Text>

            <Text style={styles.moreInfo}>
            To delete your account, confirm your account by
            entering your email and password
            </Text>
          </View>

          <View style={styles.newContactDetails}>
            <List>
                  <ListItem>
                      <InputGroup>
                          <Icon name="ios-person" style={{ color: '#3aaf85' }} />
                          <Input placeholder="Email" />
                      </InputGroup>
                  </ListItem>

                  <ListItem>
                        <InputGroup>
                            <Icon name="ios-unlock" style={{ color: '#3aaf85' }} />
                            <Input placeholder="Password" />
                        </InputGroup>
                  </ListItem>
            </List>

            <Button success onPress={() => Actions.agent_request_assessment()} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
                    DELETE MY ACCOUNT
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

export default connect(stateToProps)(DeleteMyAccount);
