import React, { Component
 } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Alert
} from 'react-native';

import { renderers } from 'react-native-popup-menu';


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
  CardItem,
  Thumbnail,

} from 'native-base';

// import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

import Menu, {
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import { connect } from 'react-redux';

import {
  getMyParcels,
  logOut
} from '../actions';


//const Item = Picker.Item;​

var ResponsiveImage = require('react-native-responsive-image');


import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';



class ShopperParcelDashboard extends Component {

  constructor(props) {
    super(props);
    }

    componentWillMount(){

      this.props.getParcels();

    }

    handleLogOut(){
        this.props.doLogOut();
    }

    getMerchantIconColor(parcelStatus, item){

      if(parcelStatus <= 1 && item ==='merchant'){
        return '#3aaf85';
      }else if (parcelStatus <= 1 && item === 'merchant_agent') {
        return 'black';
      }else if (parcelStatus <= 1 && item ==='transporter') {
        return 'black';
      }else if (parcelStatus <= 1 && item === 'agent') {
        return 'black';
      }else if (parcelStatus <= 2 && item ==='merchant') {
        return '#3aaf85';
      }else if (parcelStatus <= 2 && item === 'merchant_agent') {
        return '#3aaf85';
      }else if (parcelStatus <= 2 && item ==='transporter') {
        return 'black';
      }else if (parcelStatus <= 2 && item ==='agent') {
        return 'black';
      }else if (parcelStatus <= 3 && item ==='merchant') {
        return '#3aaf85';
      }else if (parcelStatus <= 3 && item === 'merchant_agent') {
        return '#3aaf85';
      }else if (parcelStatus <= 3 && item ==='transporter') {
        return '#3aaf85';
      }else if (parcelStatus <= 3 && item ==='agent') {
        return 'black';
      }else if (parcelStatus <= 4 && item ==='merchant') {
        return '#3aaf85';
      }else if (parcelStatus <= 4 && item === 'merchant_agent') {
        return '#3aaf85';
      }else if (parcelStatus <= 4 && item ==='transporter') {
        return '#3aaf85';
      }else if (parcelStatus <= 4 && item ==='agent') {
        return '#3aaf85';
      }
    }

    getMerchantAgentIconColor(parcelStatus, item){

      if(parcelStatus >= 2 && item === 'merchant_agent'){
        return '#3aaf85';
      }
      return 'red';
    }

    getTransporterIconColor(parcelStatus, item){

      if(parcelStatus >= 3 && item === 'transporter'){
        return '#3aaf85';
      }

      return 'red';

    }

    getAgentIconColor(parcelStatus, item){

      if(parcelStatus => 4 && item === 'agent'){
        return '#3aaf85';
      }

      return 'red';
    }

    deliveryButton(payment_status, pick_status, parcel_status){

        if(payment_status == 2 && parcel_status <= 4 && pick_status == 2){
            return(
              <Button transparent onPress={() => Actions.mpesa_confirm_number()}>
                Lipa na Mpesa
              </Button>
            )
        }else if (payment_status == 1 && parcel_status == 4 && pick_status == 2) {
          return(
          <Button transparent onPress={() => this.pickParcel()}>
           Paid For, Pick
          </Button>
        )
      }else if (payment_status == 1 && parcel_status <= 4 && pick_status == 2) {
          return(
          <Button transparent>
            Paid, on Transit
          </Button>
        )
        }
      else if (payment_status == 1 && parcel_status == 4 && pick_status == 1) {
          return(
          <Button transparent>
            Return Kshs 2,500
          </Button>
        )
        }
    }

    pickParcel(){
      Alert.alert(
      'Pick my Parcel',
      'Continue to pick my parcel',
      [
        //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'YES', onPress: () => console.log('OK Pressed')},
      ]
    )
    }

    // getMerchantAgentIconColor(parcelStatus){
    //   if(parcelStatus == 2){
    //     return '#3aaf85';
    //   }else {
    //     return 'red';
    //   }
    // }

checkDashboardStatus(){

  if(this.props.locateApplication.applicationStatus === 'NEW'){
    return (
      <Card style={{marginLeft: 10, marginRight: 10, marginTop: 15}}>
          <CardItem>

          <Text style={{color: 'green', textAlign: 'center', paddingTop: 5}}>Thank you for creating a Locate account, your account is currently new with little activity, except for this guy</Text>
          </CardItem>

          <View style={{flex: 1, paddingLeft: 70}}>
                <View style={{flexDirection: 'row'}}>
                    <ResponsiveImage source={require('./parcel_delivery_1.jpg')} initWidth="203" initHeight="249"/>
                </View>
          </View>

          <Text style={{color: 'grey', textAlign: 'center'}}>Consider him your agent, he will deliver your parcles to you:</Text>

          <Text style={{color: 'green', textAlign: 'center'}}>Agent name: Happy Supermarket</Text>
          <Text style={{color: 'green', textAlign: 'center'}}>Location: Juja Town</Text>
          <Text style={{color: 'green', textAlign: 'center'}}>Phone number: 0712675071</Text>
      </Card>
    );
  }else{

  return (
    <ScrollableTabView
      style={{marginTop: 20, }}
      tabBarUnderlineStyle={{backgroundColor:'#3aaf85' , borderColor : '#3aaf85' , borderBottomWidth : 0.1 , borderBottomColor : '#3aaf85'}}
      tabBarActiveTextColor="#3aaf85"
      renderTabBar={() => <DefaultTabBar />}
    >
      <View tabLabel='Shopper'>
      <View style={{marginTop: 5, marginLeft: 135}}>
         <Text style={{color: 'green'}}>TODAY</Text>
           </View>

           <View style={{paddingLeft: 10, paddingRight: 10}}>
           <Card style={{paddingTop: 0, paddingBottom: 0, borderTopWidth: 0, borderColor: 'transparent'}} >

          {this.props.locateApplication.userParcels.map((userParcels) =>
         <CardItem key={userParcels.key} style={{paddingTop: 5, borderTopWidth: 0, paddingBottom: 5, paddingLeft: 1, paddingRight: 5}} onPress={() => Actions.parcel_view({parcelName:"Leather Bag"})}>

              <Thumbnail style={{width: 40, height: 40}} source={require('./parcel_delivery.jpg')} />

                <View>
                <Text style={styles.parcelTextName}>
                    {userParcels.parcelName}
                </Text>

                  <Text>
                   Kshs {userParcels.parcelPrice}.00
                  </Text>

                  <Text style={styles.parcelText}>
                       {userParcels.parcelMerchant} - {userParcels.parcelType}
                  </Text>
                </View>

                <View style={styles.mpesaButton}>

                  {this.deliveryButton(userParcels.paymentStatus, userParcels.pickStatus, userParcels.parcelStatus)}
                  <View style={{flex: 1, flexDirection: 'row', left: 55, top: 3}}>
                    <Icon style={{color: this.getMerchantIconColor(userParcels.parcelStatus, 'merchant'), fontSize: 13}}
                    name="md-body"></Icon>
                    <Icon style={{ color: this.getMerchantIconColor(userParcels.parcelStatus, 'merchant_agent'), fontSize: 13}} name="md-body"></Icon>
                    <Icon style={{color: this.getMerchantIconColor(userParcels.parcelStatus, 'transporter'), fontSize: 13}} name="md-body"></Icon>
                    <Icon style={{color: this.getMerchantIconColor(userParcels.parcelStatus, 'agent'), fontSize: 13}} name="md-body"></Icon>


                    {/* <Icon style={{color: 'red'}} name="ios-checkmark"></Icon> */}
                  </View>
                </View>
                </CardItem>
              )}

            </Card>
          </View>
      </View>
      <View tabLabel='Agent'>
      <View style={{marginTop: 20, marginLeft: 135}}>
         <Text style={{color: 'green'}}>TODAY</Text>
           </View>

           <View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 15}}>
           <Card>

          {this.props.locateApplication.userParcels.map((userParcels) =>
         <CardItem key={userParcels.key} style={{paddingTop: 1}} onPress={() => Actions.parcel_view({parcelName:"Leather Bag"})}>
             <Thumbnail style={{width: 40, height: 40}} source={require('./parcel_delivery.jpg')} />
               <View>
                 <Text>
                     {userParcels.parcelName}
                 </Text>

                 <Text note>
                     {userParcels.parcelPrice}
                 </Text>

                 <Text note>
                     {userParcels.merchant}
                 </Text>
               </View>

               <View style={styles.mpesaButton}>
                 <Button success>
                   Lipa na Mpesa
                 </Button>
               </View>

               <View>
                 <Icon style={{color: 'green'}} name="ios-checkmark"></Icon>
                 <Icon style={{marginTop: -15, color: 'red'}} name="ios-checkmark"></Icon>
                 <Icon style={{marginTop: -15, color: 'red'}} name="ios-checkmark"></Icon>
                 <Icon style={{marginTop: -15, color: 'red'}} name="ios-checkmark"></Icon>
               </View>
           </CardItem>
         )}

       </Card>
     </View>
      </View>
      <View tabLabel='Transporter'>
      <View style={{marginTop: 20, marginLeft: 135}}>
         <Text style={{color: 'green'}}>TODAY</Text>
           </View>

           <View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 15}}>
           <Card>

          {this.props.locateApplication.userParcels.map((userParcels) =>
         <CardItem key={userParcels.key} style={{paddingTop: 1}} onPress={() => Actions.parcel_view({parcelName:"Leather Bag"})}>
             <Thumbnail style={{width: 40, height: 40}} source={require('./parcel_delivery.jpg')} />
               <View>
                 <Text>
                     {userParcels.parcelName}
                 </Text>

                 <Text note>
                     {userParcels.parcelPrice}
                 </Text>

                 <Text note>
                     {userParcels.merchant}
                 </Text>
               </View>

               <View style={styles.mpesaButton}>
                 <Button success>
                   Lipa na Mpesa
                 </Button>
               </View>

               <View>
                 <Icon style={{color: 'green'}} name="ios-checkmark"></Icon>
                 <Icon style={{marginTop: -15, color: 'red'}} name="ios-checkmark"></Icon>
                 <Icon style={{marginTop: -15, color: 'red'}} name="ios-checkmark"></Icon>
                 <Icon style={{marginTop: -15, color: 'red'}} name="ios-checkmark"></Icon>
               </View>
           </CardItem>
         )}
       </Card>
     </View>
      </View>
      <View tabLabel='Merchant'>
      <View style={{marginTop: 5, marginLeft: 135}}>
         <Text style={{color: 'green'}}>TODAY</Text>
           </View>

           <View style={{paddingLeft: 10, paddingRight: 10}}>
           <Card style={{paddingTop: 0, paddingBottom: 0, borderTopWidth: 0, borderColor: 'transparent'}} >

          {this.props.locateApplication.userParcels.map((userParcels) =>
         <CardItem key={userParcels.key} style={{paddingTop: 5, borderTopWidth: 0, paddingBottom: 5, paddingLeft: 1, paddingRight: 5}} onPress={() => Actions.parcel_view({parcelName:"Leather Bag"})}>
         <Thumbnail style={{width: 40, height: 40}} source={require('./parcel_delivery.jpg')} />
           <View>
             <Text>
                 {userParcels.parcelName}
             </Text>

             <Text note>
                 {userParcels.parcelPrice}
             </Text>

             <Text note>
                 {userParcels.merchant}
             </Text>
           </View>

           <View style={styles.mpesaButton}>
             <Button success>
               Lipa na Mpesa
             </Button>
           </View>

           <View>
             <Icon style={{color: 'green'}} name="ios-checkmark"></Icon>
             <Icon style={{marginTop: -15, color: 'red'}} name="ios-checkmark"></Icon>
             <Icon style={{marginTop: -15, color: 'red'}} name="ios-checkmark"></Icon>
             <Icon style={{marginTop: -15, color: 'red'}} name="ios-checkmark"></Icon>
           </View>
         </CardItem>
         )}

       </Card>
     </View>
      </View>

    </ScrollableTabView>
    //  <View>
    //     <View style={{marginTop: 20, marginLeft: 135}}>
    //      <Text style={{color: 'green'}}>TODAY</Text>
    //       </View>
    //
    //      <View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 15}}>
    //        <Card>
    //
    //         {this.props.locateApplication.userParcels.map((userParcels) =>
    //         <CardItem key={userParcels.key} style={{paddingTop: 1}} onPress={() => Actions.parcel_view({parcelName:"Leather Bag"})}>
    //             <Thumbnail style={{width: 40, height: 40}} source={require('./parcel_delivery.jpg')} />
    //               <View>
    //                 <Text>
    //                     {userParcels.parcelName}
    //                 </Text>
    //
    //                 <Text note>
    //                     {userParcels.parcelPrice}
    //                 </Text>
    //
    //                 <Text note>
    //                     {userParcels.merchant}
    //                 </Text>
    //               </View>
    //
    //               <View style={styles.mpesaButton}>
    //                 <Button success>
    //                   Lipa na Mpesa
    //                 </Button>
    //               </View>
    //
    //               <View>
    //                 <Icon style={{color: 'green'}} name="ios-checkmark"></Icon>
    //                 <Icon style={{marginTop: -15, color: 'red'}} name="ios-checkmark"></Icon>
    //                 <Icon style={{marginTop: -15, color: 'red'}} name="ios-checkmark"></Icon>
    //                 <Icon style={{marginTop: -15, color: 'red'}} name="ios-checkmark"></Icon>
    //               </View>
    //           </CardItem>
    //         )}
    //
    //       </Card>
    //     </View>
    //
    //
    // </View>
  );
}
}




render() {

  console.log(this.props.locateApplication.userParcels)


    const goToParcelView = () => Actions.parcel_view({parcelName:"Custom data"});

    return (
      <Container>
        <Header style={styles.navHeader}>
            <Title>Locate</Title>
            <View></View>

                    <Menu renderer={NotAnimatedContextMenu} onSelect={value => alert(`Selected number: ${value}`)}>
                    <MenuTrigger style={styles.trigger}>
                       <Text style={{color: 'white'}}>
                        More Options
                       </Text>
                     </MenuTrigger>
                     <MenuOptions>
                        <MenuOption value={1} onSelect={() => Actions.send_agent_request()}>
                        <Text style={{color: '#3aaf85', padding: 10}}>Agent request</Text>
                        </MenuOption>
                        <MenuOption value={2} onSelect={() => Actions.agent_request_passed()}>
                          <Text style={{color: '#3aaf85', padding: 10}}>Request(Approved)</Text>
                        </MenuOption>
                        <MenuOption value={1} onSelect={() => Actions.agent_request_failed()}>
                        <Text style={{color: '#3aaf85', padding: 10}}>Request(Denied)</Text>
                        </MenuOption>
                        <MenuOption value={1} onSelect={() => Actions.send_transporter_request()}>
                        <Text style={{color: '#3aaf85', padding: 10}}>Transporter Request</Text>
                        </MenuOption>
                        <MenuOption value={1} onSelect={() => Actions.settings()}>
                        <Text style={{color: '#3aaf85', padding: 10}}>Settings</Text>
                        </MenuOption>
                        <MenuOption value={1} onSelect={() => this.handleLogOut()}>
                        <Text style={{color: '#3aaf85', padding: 10}}>Log out</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
        </Header>

        {/* <View style={{marginTop: -40}}> */}
        {/* <Menu>
          <MenuTrigger style={styles.menuTrigger}>

                  <Icon name="md-more" style={{color: 'white', left: 275}}></Icon>

          </MenuTrigger>
          <MenuOptions style={styles.menuOptions}>
            <MenuOption value="normal">
              <Text onPress={() => Actions.send_agent_request()}>Agent request</Text>
            </MenuOption>
            <MenuOption value="normal">
              <Text onPress={() => Actions.agent_request_passed()}>Request(Approved)</Text>
            </MenuOption>
            <MenuOption value="normal">
              <Text onPress={() => Actions.agent_request_failed()}>Request(Denied)</Text>
            </MenuOption>
            <MenuOption value="normal">
              <Text onPress={() => Actions.send_transporter_request()}>Transporter request</Text>
            </MenuOption>
            <MenuOption value="normal">
              <Text onPress={() => Actions.settings()} >Settings</Text>
            </MenuOption>
            <MenuOption value="normal">
              <Text onPress={() => this.handleLogOut()}>Log out</Text>
            </MenuOption>
          </MenuOptions>
        </Menu> */}
        {/* </View> */}

        <Content>
          {this.checkDashboardStatus()}
        </Content>
      </Container>

    );
  }
}

const stateToProps = (state) => {
  return {
      locateApplication: state.locateApplication
 	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getParcels: () => {
      dispatch(getMyParcels())
    },
    doLogOut: ()  => {
      dispatch(logOut())
    }
  }
}

const { NotAnimatedContextMenu } = renderers;


const triggerStyles = {
  triggerText: {
    color: 'white',
  },
  triggerWrapper: {
    padding: 5,
    backgroundColor: 'blue',
  },
  triggerTouchable: {
    underlayColor: 'darkblue',
    activeOpacity: 70,
  },
}

// Styles
const styles = StyleSheet.create({

  topbar: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  backgroundColor: 'black',
  paddingHorizontal: 5,
  paddingVertical: 10
},
menuTrigger: {
  flexDirection: 'row',
  paddingHorizontal: 10
},
menuTriggerText: {
  color: 'lightgrey',
  fontWeight: '600',
  fontSize: 20
},
disabled: {
  color: '#ccc'
},
divider: {
  marginVertical: 5,
  marginHorizontal: 2,
  borderBottomWidth: 1,
  borderColor: '#ccc'
},
content: {
  backgroundColor: 'white',
  paddingHorizontal: 10,
  paddingTop: 20,
  paddingBottom: 30,
  borderBottomWidth: 1,
  borderColor: '#ccc'
},
contentText: {
  fontSize: 18
},
dropdown: {
  width: 300,
  borderColor: '#999',
  borderWidth: 1,
  padding: 5
},
dropdownOptions: {
  marginTop: 30,
  borderColor: '#ccc',
  borderWidth: 2,
  width: 300,
  height: 200
},
navHeader: {
  backgroundColor: '#3aaf85'
},
mpesaButton: {
  paddingTop: 10,
  paddingLeft: 20
},
parcelTextName:{
  color: 'black',
  fontWeight: 'bold'
},
parcelText:{
  color: 'grey',
  fontSize: 10
}

});

export default connect(stateToProps, mapDispatchToProps)(ShopperParcelDashboard);
