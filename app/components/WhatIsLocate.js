import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Dimensions
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

// import Swiper from 'react-native-page-swiper';
import SwipeALot from 'react-native-swipe-a-lot';

class WhatIsLocate extends Component {


render() {
    return (

      // <Container>
      //   <Header>
      //       <Title>Locate Features</Title>
      //   </Header>
      //
      //
      //   <Content>
      //   <Card style={{marginLeft: 10, marginRight: 10, marginTop: 10, borderColor: 'green'}}>
      //
      //
      //           <CardItem style={{borderColor: 'green'}}>
      //               <Text style={styles.features}>
      //                <Text style={{fontWeight: 'bold'}}>Checkout: </Text>
      //                See a Locate checkout button somewhere,
      //                click it and provide your locate email and password,
      //                Locate will then deliver your items.
      //               </Text>
      //           </CardItem>
      //
      //
      //           <CardItem style={{borderColor: 'green'}}>
      //               <Text style={styles.features}>
      //               <Text style={{fontWeight: 'bold'}}>Notifications: </Text>
      //               Get real time alerts as your parcel is being
      //               delivered to you, Locate will also give
      //               you a designated delivery time.
      //               </Text>
      //           </CardItem>
      //           <CardItem style={{borderColor: 'green'}}>
      //               <Text style={styles.features}>
      //               <Text style={{fontWeight: 'bold'}}>Payments: </Text>
      //               Pay using Locate, confirm the item you bought first then
      //               pay using Locate Mpesa button.
      //               </Text>
      //           </CardItem>
      //
      //           <CardItem style={{borderColor: 'green'}}>
      //               <Text style={styles.features}>
      //               <Text style={{fontWeight: 'bold'}}>Returns: </Text>
      //               Return an item, a small
      //               return fee is applicable, get alerts when the
      //               merchant receives your item, get an alert when your refund is due or a new item starts to be
      //               shipped.
      //               </Text>
      //           </CardItem>
      //      </Card>
      //   </Content>
      //   <Footer>
      //   <Footer>
      //     <View >
      //     <Button style={{width: 150}} success onPress={() => Actions.shopper_parcel_dashboard()}>
      //         <Icon name="ios-checkmark-circle"></Icon>
      //         GET STARTED
      //     </Button>
      //     </View>
      //   </Footer>
      //   </Footer>
      //
      //
      // </Container>

  //     <Swiper style={styles.wrapper}>
  //   <View style={styles.slide1}>
  //     <Text style={styles.text}>Hello Swiper</Text>
  //   </View>
  //
  //   <View style={styles.slide2}>
  //     <Text style={styles.text}>Beautiful</Text>
  //   </View>
  //
  //   <View style={styles.slide3}>
  //     <Text style={styles.text}>And simple</Text>
  //   </View>
  // </Swiper>
<View style={styles.swipeWrapper}>
  <SwipeALot>
      <View style={styles.wrapper}>
        <Text style={styles.features}>Checkout online using Locate</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.features}>Get Delivery Notifications in Realtime</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.features}>Pick items at your agent</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.features}>Pay with mpesa</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.features}>Return items using Locate</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.features}>Get delivery feedback from merchants</Text>
      </View>
    </SwipeALot>

    <Button success style={styles.dashboardButton} onPress={() => Actions.shopper_parcel_dashboard()}>
      Continue To Dashboard
    </Button>
</View>



    );
  }
}

// Styles
const styles = StyleSheet.create({
  features: {
    fontSize: 15,
    color: '#3aaf85',
    fontWeight: 'bold'
  },
  wrapper: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 },
 swipeWrapper: {
   flex: 1,
   paddingBottom: 20,
   backgroundColor: '#dfe3ee'

 },
 dashboardButton:{
   alignSelf: 'center'
 }
});

module.exports = WhatIsLocate;
