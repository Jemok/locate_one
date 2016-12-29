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

class ChangeMyPassword extends Component {

render() {
    return (
      <Container>
        <Header>
          <Button transparent onPress={() => Actions.pop()}>
              <Icon name="md-arrow-back"></Icon>
          </Button>
          <Title>Change password</Title>
        </Header>

        <Content>
          <View>
            <Text style={styles.requestMessage}>
              Changing your password will:
            </Text>
            <Text style={styles.moreInfo}>
            Change your Locate login password both on the
            locate web application and on the
            Locate mobile application
            </Text>
          </View>

          <View style={styles.newContactDetails}>
            <List>
                  <ListItem>
                      <InputGroup>
                          <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                          <Input placeholder="Email" />
                      </InputGroup>
                  </ListItem>

                  <ListItem>
                        <InputGroup>
                            <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                            <Input placeholder="Old password" />
                        </InputGroup>
                  </ListItem>

                  <ListItem>
                        <InputGroup>
                            <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                            <Input placeholder="New password" />
                        </InputGroup>
                    </ListItem>
            </List>

            <Button onPress={() => Actions.agent_request_assessment()} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
                    CHANGE MY PASSWORD
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
  }
});

export default connect(stateToProps)(ChangeMyPassword);
