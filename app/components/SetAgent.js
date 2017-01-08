/**
*  Shows setting of agents
**/

// Imports
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  ToastAndroid,
  NetInfo
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
  Spinner
} from 'native-base';
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Permissions from 'react-native-permissions';
import FCM from 'react-native-fcm';
import Modal from 'react-native-root-modal';


import PriceMarker from './PriceMarker';
import CustomCallout from './CustomCallout';

import {
  setNewMapRegion,
  changeMapSearchStatus,
  setLocationPermission,
  setAgentStatus,
  requestAgents,
  fetchAgents,
  setMyAgentDetails,
  toggleMyLocationSpinner,
  toggleLocationFailedModal,
  toggleLocationFoundModal,
  agentSetSuccess,
  connectionState
} from '../actions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';


class SetAgent extends Component {

  getLocation(){

    navigator.geolocation.getCurrentPosition((position) => {

    console.log('my position'+position);

    this.props.setRegion(position.coords.latitude, position.coords.longitude, '');
    this.props.changeLocationFoundModal(true);


  }, error =>

  {this.props.changeLocationFailedModal(true),

  console.log('Location error is' +error)},
   { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });

    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.props.setRegion(position.coords.latitude, position.coords.longitude, '');
    });
  }

  goToCreateAccount(){
    this.props.agentSet(false);

    Actions.create_account();
  }

  showSpinner(){

    if(this.props.locateApplication.getMyLocationSpinner === true){

      return (
          <Spinner color='green' />
      );
    }
  }

  _handleConnectionChange = (isConnected) => {
   this.props.changeConnectionState(isConnected);
 };

  componentDidMount() {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //
  //   console.log('my position'+position);
  //
  //   this.props.setRegion(position.coords.latitude, position.coords.longitude, '');
  //
  // }, error => console.log(error), { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
  //
  //   this.watchID = navigator.geolocation.watchPosition((position) => {
  //     this.props.setRegion(position.coords.latitude, position.coords.longitude, '');
  //   });

  //NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);

  NetInfo.isConnected.fetch().then(isConnected => {
  console.log('First, is ' + (isConnected ? 'online' : 'offline'));

  if(isConnected){
    //this.props.changeConnectionState(true)
    Permissions.getPermissionStatus('location')
      .then((response) => {
        //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        this.props.setNewLocationPermission(response);
        console.log('Location Permission for Locatte is '+response);
          if(this.props.locateApplication.locationPermission === 'authorized'){
            this.props.changeMyLocationSpinner(true);

            navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log(position.coords.latitude, position.coords.longitude);
              this.props.setRegion(position.coords.latitude, position.coords.longitude, '');
              this.props.changeMyLocationSpinner(false);
              this.props.changeLocationFoundModal(true);

            },
            (error) =>
            // Alert.alert( 'Location access ?',
            //  'Locate determines your phone’s location for a better overall app experience.',
            //  [
            //    {text: 'Go to setings and turn on your location', onPress: () => console.log('permission denied'), style: 'cancel'},
            //   (this.props.locateApplication.locationPermission == 'undetermined') ?
            //     {text: 'OK', onPress: this._requestPermission.bind(this)},
            //     {text: 'Open Settings', onPress: this.handleClick()  }
            //  ])
            {

            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
            .then(data => {
              // The user has accepted to enable the location services
              // data can be :
              //  - "already-enabled" if the location services has been already enabled
              //  - "enabled" if user has clicked on OK button in the popup
              console.log('The location data is'+ data);

              this.props.changeMyLocationSpinner(true);
              this.getLocation();
              this.props.changeMyLocationSpinner(false);


            }).catch(err => {
              // The user has not accepted to enable the location services or something went wrong during the process
              // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
              // codes :
              //  - ERR00 : The user has clicked on Cancel button in the popup
              //  - ERR01 : If the Settings change are unavailable
              //  - ERR02 : If the popup has failed to open
              console.log('The location error is'+ err);

              this.props.changeMyLocationSpinner(true);
              this.getLocation();
              this.props.changeMyLocationSpinner(false);
            })

          }

            // Alert.alert(
            //   'Turn on device Location',
            //   'This will help us to deliver your parcels, enable location access in your device settings then continue ',
            //   [
            //     {text: 'No way', onPress: () => console.log('permission denied'), style: 'cancel'},
            //     // this.props.locateApplication.locationPermission === 'undetermined'?
            //       {text: 'OK', onPress: this._requestPermission.bind(this)}
            //       // : {text: 'Open Settings', onPress: Permissions.openSettings}
            //   ]
            // )
             ,
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
          );
          this.watchID = navigator.geolocation.watchPosition((position) => {
            this.props.setRegion(position.coords.latitude, position.coords.longitude, '');
            // var lastPosition = JSON.stringify(position);
            // this.setState({lastPosition});
          });
        }
      }).catch(error => console.log('Failure'));
  }else {
    Alert.alert('You are offline',
    'Locate needs internet access to work efficiently'
  );
  }
});






      FCM.requestPermissions();

    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)", token);
      //this.props.onChangeToken(token);
    });

    FCM.getInitialNotification().then(notif => {
      console.log("INITIAL NOTIFICATION", notif)
    });

    this.notificationUnsubscribe = FCM.on("notification", notif => {
      console.log("Notification", notif);
      if (notif && notif.local) {
        return;
      }
      this.sendRemote(notif);
    });

    this.refreshUnsubscribe = FCM.on("refreshToken", token => {
      console.log("TOKEN (refreshUnsubscribe)", token);
      //this.props.onChangeToken(token);
    });
  }


  sendRemote(notif) {
    FCM.presentLocalNotification({
      title: notif.score,
      body: notif.time,
      priority: "high",
      click_action: notif.click_action,
      show_in_foreground: true,
      local: true
    });
  }

  //request permission to access location
  _requestPermission() {
    Permissions.requestPermission('location')
      .then(response => {
        //returns once the user has chosen to 'allow' or to 'not allow' access
        //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        //this.setState({ photoPermission: response })
        this.props.setNewLocationPermission(response)
      });
  }

  componentWillUnmount() {
   navigator.geolocation.clearWatch(this.watchID);
   this.refreshUnsubscribe();
    this.notificationUnsubscribe();
    NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);

  }

  openSearchModal() {

  this.props.changeLocationFailedModal(false);


  RNGooglePlaces.openAutocompleteModal()
  .then((place) => {
      console.log(place.name);
      this.props.setRegion(place.latitude, place.longitude, place.name);
      console.log('Success');
      // place represents user's selection from the
      // suggestions and it is a simplified Google Place object.
  })
  .catch(error => console.log('Failure'));  // error is a Javascript Error object
 }


onPressMarker(markerInfo) {
  console.log(markerInfo.latitude);
  Alert.alert(
  'Set My Agent',
  'Set '+ markerInfo.location_name + ' as my new Agent?',
  [
    {text: 'NO', onPress: () => this.setAgentClicked('NO', ''), style: 'cancel'},
    {text: 'YES', onPress: () => this.setAgentClicked('YES', markerInfo)},
  ]
)
}

setAgentClicked(action, agent_details){
  if(action === 'YES'){

    this.props.setMyAgent(agent_details);

    this.props.setAgent('SET');

    this.props.agentSet(true);
  }

  this.showToast(action)
}

showToast(action){

  if(action == 'YES'){
    var message = 'YOUR AGENT WAS SET SUCCESSFULLY';
  }else if (action == 'NO') {
    var message = 'AGENT SETTING CANCELED';
  }

  ToastAndroid.showWithGravity(
                 message,
                 ToastAndroid.LONG,
                 ToastAndroid.BOTTOM)
}

checkAgentSettingStatus(){
  if(this.props.locateApplication.agentSettingStatus === 'NOT_SET'){
    return true;
  }else {
    return false;
  }
}

getRegisterButtonMessage(){
  if(this.props.locateApplication.agentSettingStatus === 'NOT_SET'){
    return 'SET AN AGENT TO CONTINUE';
  }else {
    return 'CREATE MY LOCATE ACCOUNT';
  }
}

render() {

    console.log(this.props.locateApplication.markerInfo);
      const markers = this.props.locateApplication.markerInfo.map((markerInfo) =>
        <MapView.Marker
          coordinate={markerInfo}
          key={markerInfo.id}
          calloutOffset={{ x: -8, y: 28 }}
          calloutAnchor={{ x: 0.5, y: -0.1 }}
          onPress={() =>this.onPressMarker(markerInfo)}
        >
          <PriceMarker amount={markerInfo.location_name} />
          {/* <MapView.Callout
                        tooltip
                        style={styles.customView}
                        onPress={() =>this.onPressMarker(markerInfo)}>
              <CustomCallout>
                <Text style={styles.calloutAgentName}>Happy Supermarket - JUJA</Text>
                <Text style={styles.calloutPhoneNumber}>0712 675 071</Text>
                <Text style={styles.calloutSetAgent}>TAP TO SET AGENT</Text>
              </CustomCallout>
            </MapView.Callout> */}
        </MapView.Marker>
      );

      return (
        <Container>
          <Header style={styles.navHeader}>
            <Button transparent onPress={() => Actions.pop()} >
                  <Icon name='md-arrow-back'/>
            </Button>

            <Title onPress={() => this.openSearchModal()}>
                Pick Agent
            </Title>

            <Button transparent onPress={() => this.openSearchModal()}>
                  <Icon name='md-search'/>
            </Button>
          </Header>
          <Content style={styles.conentView}>


              <View style ={styles.container}>
              {/* <LocationChecker  /> */}

              {this.showSpinner()}

              <Modal
              style={{
                  top: 100,
                  right: 10,
                  bottom: 160,
                  left: 10,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)'
              }}

              visible={this.props.locateApplication.locationFailedModal}
          >
            <Text style={styles.modalText}>
               Location not found
            </Text>

            <Button success onPress={() => this.openSearchModal()} style={styles.findMyAgent}>
                  Find my agent
                  <Icon name='md-search'/>
            </Button>


            <Button success onPress={() => this.props.changeLocationFailedModal(false)} style={styles.scrollMap}>
                    Scroll  map
                    <Icon name='md-locate'/>
            </Button>
          </Modal>

          <Modal
          style={{
              top: 150,
              right: 10,
              bottom: 160,
              left: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.6)'
          }}

          visible={this.props.locateApplication.locationFoundModal}
      >
        <Text style={styles.locationFoundText}>
           Location found
        </Text>

        <Button success onPress={() => this.props.changeLocationFoundModal(false)} style={styles.scrollMapFound}>
                Scroll map and click your best agent
                <Icon name='md-locate'/>
        </Button>
      </Modal>

      <Modal
      style={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
      }}

      visible={this.props.locateApplication.agentSet}
  >


  <Button  onPress={() => this.props.agentSet(false)} style={styles.changeAgentButton}>
          Pick another Agent
          <Icon name='md-create'/>

  </Button>

    <Button success onPress={() => this.goToCreateAccount()} style={styles.continueButton}>
          Continue to Create Account
          <Icon name='md-checkmark'/>
    </Button>


  </Modal>


                <MapView
                  style={styles.map}
                  region={this.props.locateApplication.region}
                  mapType="standard"
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  showsCompass={true}
                  loadingEnabled={true}
                  showsBuildings={true}
                  showsPointsOfInterest={true}
                  followsUserLocation={true}
                  //loadingBackgroundColor="#0000FF"
                >

                {markers}

                <MapView.Marker
                    coordinate={this.props.locateApplication.region}
                    image={require('./flag-blue.png')}
                    // onPress={() =>this.onPressMarker(this.props.locateApplication.region)}
                    // title={this.props.locateApplication.placeName}
                >
                  <Text style={styles.placeName}>{this.props.locateApplication.placeName}</Text>
                </MapView.Marker>
                </MapView>
              </View>
          </Content>

          {/* <Footer>
            <View style={styles.continueButton}>
              <Button disabled={this.checkAgentSettingStatus()} iconRight info onPress={() => Actions.create_account() }>{ this.getRegisterButtonMessage() }</Button>
            </View>

            <View style={styles.loginButton}>
              <Button info onPress={() => Actions.login() }> LOGIN </Button>
            </View>
          </Footer> */}
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
    setRegion: (latitude, longitude, placeName) => {
      dispatch(setNewMapRegion(latitude, longitude, placeName))
    },
    toogleMapSearchStatus: (status) => {
      dispatch(changeMapSearchStatus(status))
    },
    setNewLocationPermission: (permission) => {
      dispatch(setLocationPermission(permission))
    },
    setAgent: (status) => {
      dispatch(setAgentStatus(status))
    },
    fetchLocations: () => {
      dispatch(requestAgents())
    },
    getAgents: () => {
      dispatch(fetchAgents())
    },
    setMyAgent: (agent_details) => {
      dispatch(setMyAgentDetails(agent_details))
    },
    changeMyLocationSpinner: (status) => {
      dispatch(toggleMyLocationSpinner(status))
    },
    changeLocationFailedModal: (status) => {
      dispatch(toggleLocationFailedModal(status))
    },
    changeLocationFoundModal: (status) => {
      dispatch(toggleLocationFoundModal(status))
    },
    agentSet: (status) => {
      dispatch(agentSetSuccess(status))
    },
    changeConnectionState: (status) => {
      dispatch(connectionState(status))
    }
  }
}


// Styles
const styles = StyleSheet.create({
  conentView: {
    flex: 1
  },
  navHeader: {
    backgroundColor: '#3aaf85'
  },
  setMapInfoText: {
    top: 3,
    bottom: 5,
    textAlign: 'center',
    color: 'gray'
  },
  container: {
  position: 'relative',
  height: 500,
  justifyContent: 'flex-end'
},
map: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
},
search: {
  top: 5,
  left: 15,
  width:280,
  height: 40
},
continueButton:{
  alignSelf: 'center',
  marginTop: 70
},
loginButton:{
  left: 180
},
customView: {
    width: 140,
    height: 80,
},
calloutAgentName:{
  fontSize:8,
  paddingHorizontal: 3,
},
calloutPhoneNumber:{
  fontSize:11,
  paddingHorizontal: 15,
},
calloutSetAgent:{
  fontSize: 6,
  color: 'white',
  paddingHorizontal: 25,
},
placeName:{
  color: 'white',
  backgroundColor: 'red',
  top: -5
},
modalText: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center'
},
locationFoundText: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  top: 20
},
findMyAgent:{
  alignSelf: 'center',
  top: 20
},
scrollMap:{
  alignSelf: 'center',
  marginTop: 100
},
scrollMapFound:{
  alignSelf: 'center',
  marginTop: 70
},
changeAgentButton: {
  alignSelf: 'center',
  marginTop: 150
}

});

export default connect(stateToProps, mapDispatchToProps)(SetAgent);
