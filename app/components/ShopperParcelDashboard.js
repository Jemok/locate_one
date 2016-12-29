import React, { Component
 } from 'react';

import {
  StyleSheet,
  View,
  Image
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
  CardItem,
  Thumbnail,

} from 'native-base';

import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

import { connect } from 'react-redux';

import {
  getMyParcels,
  logOut
} from '../actions';


//const Item = Picker.Item;​

var ResponsiveImage = require('react-native-responsive-image');



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
  }

  return (
     <View>
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
  );

}




render() {

  console.log(this.props.locateApplication.userParcels)


    const goToParcelView = () => Actions.parcel_view({parcelName:"Custom data"});

    return (
      <MenuContext style={{flex: 1}}>
      <Container>
        <Header>
            <Title>My Shopper parcels</Title>
        </Header>
        <View style={{marginTop: -40}}>
        <Menu>
          <MenuTrigger style={styles.menuTrigger}>

                  <Icon name="md-more" style={{color: 'white', left: 275}}></Icon>

            {/* <Text style={styles.menuTriggerText}>OPEN FIRST MENU</Text> */}
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
            {/* <View style={styles.divider}/> */}
            <MenuOption value="normal">
              <Text onPress={() => this.handleLogOut()}>Log out</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
        </View>

        <Content>
          {this.checkDashboardStatus()}
        </Content>
      </Container>
      </MenuContext>

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
}

});

export default connect(stateToProps, mapDispatchToProps)(ShopperParcelDashboard);
