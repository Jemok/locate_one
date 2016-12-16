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
} from '../actions';


//const Item = Picker.Item;​

var ResponsiveImage = require('react-native-responsive-image');



class ShopperParcelDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 'Try clicking the top-right menus',
      firstMenuDisabled: false,
      dropdownSelection: '-- Choose --'
        }
    }

    componentWillMount(){

      this.props.getParcels();

    }

    setMessage(value) {
  if (typeof value === 'string') {
    this.setState({ message: `You selected "${value}"` });
  } else {
    this.setState({ message: `Woah!\n\nYou selected an object:\n\n${JSON.stringify(value)}` });
  }
  return value !== 'do not close';
}
setFirstMenuDisabled(disabled) {
  this.setState({
    message: `First menu is ${disabled ? 'disabled' : 'enabled'}`,
    firstMenuDisabled: disabled
  });
  return false;
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
           <Card >

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
        <Menu onSelect={this.setMessage}>
          <MenuTrigger disabled={this.state.firstMenuDisabled} style={styles.menuTrigger}>

                  <Icon name="md-more" style={{color: 'white', left: 275}}></Icon>

            {/* <Text style={styles.menuTriggerText}>OPEN FIRST MENU</Text> */}
          </MenuTrigger>
          <MenuOptions style={styles.menuOptions}>
            <MenuOption value="normal">
              <Text>Agent request</Text>
            </MenuOption>
            <MenuOption value="do not close">
              <Text>Transporter request</Text>
            </MenuOption>
            <MenuOption value="disabled" disabled={true}>
              <Text>Settings</Text>
            </MenuOption>
            {/* <View style={styles.divider}/> */}
            <MenuOption value={{ message: 'Hello World!' }}>
              <Text>Log out</Text>
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
