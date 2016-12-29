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

class ContactLocate extends Component {

render() {
    return (
      <Container>
        <Header>
          <Button transparent onPress={() => Actions.pop()}>
              <Icon name="md-arrow-back"></Icon>
          </Button>
          <Title>Contact Locate</Title>
        </Header>

        <Content>
          <View>
            <Text style={styles.moreInfo}>
            Please describe your problem below
            </Text>
          </View>

          <View style={styles.newContactDetails}>
            <List>
                  <ListItem>
                        <InputGroup>
                            <Input placeholder="Start describing your problem" />
                        </InputGroup>
                    </ListItem>
            </List>

            <Text style={styles.Faq}>
              HAVE YOU READ OUR FAQ YET?
            </Text>

            <Button onPress={() => Actions.agent_request_assessment()} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
                    CHANGE MY EMAIL
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
  Faq: {
    marginTop: 20,
    marginLeft: 40
  }
});

export default connect(stateToProps)(ContactLocate);
