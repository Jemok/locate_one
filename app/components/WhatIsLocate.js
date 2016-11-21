import React, { Component } from 'react';

import {
  StyleSheet,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Footer,
  Icon,
  CheckBox,
  Spinner,
  Card,
  CardItem
} from 'native-base';


class WhatIsLocate extends Component {


render() {
    return (

      <Container>
        <Header>
            <Title>Locate Features</Title>
        </Header>


        <Content>
        <Card style={{marginLeft: 10, marginRight: 10, marginTop: 10, borderColor: 'green'}}>


                <CardItem style={{borderColor: 'green'}}>
                    <Text style={styles.features}>
                     <Text style={{fontWeight: 'bold'}}>Checkout: </Text>
                     See a Locate checkout button somewhere,
                     click it and provide your locate email and password,
                     Locate will then deliver your items.
                    </Text>
                </CardItem>


                <CardItem style={{borderColor: 'green'}}>
                    <Text style={styles.features}>
                    <Text style={{fontWeight: 'bold'}}>Notifications: </Text>
                    Get real time alerts as your parcel is being
                    delivered to you, Locate will also give
                    you a designated delivery time.
                    </Text>
                </CardItem>
                <CardItem style={{borderColor: 'green'}}>
                    <Text style={styles.features}>
                    <Text style={{fontWeight: 'bold'}}>Payments: </Text>
                    Pay using Locate, confirm the item you bought first then
                    pay using Locate Mpesa button.
                    </Text>
                </CardItem>

                <CardItem style={{borderColor: 'green'}}>
                    <Text style={styles.features}>
                    <Text style={{fontWeight: 'bold'}}>Returns: </Text>
                    Return an item, a small
                    return fee is applicable, get alerts when the
                    merchant receives your item, get an alert when your refund is due or a new item starts to be
                    shipped.
                    </Text>
                </CardItem>
           </Card>
        </Content>
        <Footer>
        <Footer>
          <View >
          <Button style={{width: 150}} success onPress={() => Actions.shopper_parcel_dashboard()}>
              <Icon name="ios-checkmark-circle"></Icon>
              GET STARTED
          </Button>
          </View>
        </Footer>
        </Footer>


      </Container>

    );
  }
}

// Styles
const styles = StyleSheet.create({
  features: {
    fontSize: 13,
    color: 'green'
  }
});

module.exports = WhatIsLocate;
