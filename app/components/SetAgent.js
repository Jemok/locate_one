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
  Icon
} from 'native-base';

import PriceMarker from './PriceMarker';
import CustomCallout from './CustomCallout';

import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Permissions from 'react-native-permissions';

import {
  setNewMapRegion,
  changeMapSearchStatus,
  setLocationPermission,
  setAgentStatus,
  requestAgents,
  fetchAgents,
  setMyAgentDetails
} from '../actions';

// import SplashScreen from 'react-native-splash-screen';

class SetAgent extends Component {

  componentWillMount() {
    this.props.getAgents();
  }

  componentDidMount() {
    // SplashScreen.hide();

    //this.props.fetchLocations();
    Permissions.getPermissionStatus('location')
      .then((response) => {
        //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        this.props.setNewLocationPermission(response);
        console.log('Location Permission is '+response);
          if(this.props.locateApplication.locationPermission == 'authorized'){
            navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log(position.coords.latitude, position.coords.longitude);
              this.props.setRegion(position.coords.latitude, position.coords.longitude, '');
            },
            (error) => Alert.alert( 'Location access ?',
             'Locate determines your phone’s location for a better overall app experience.',
             [
               {text: 'Go to setings and turn on your location', onPress: () => console.log('permission denied'), style: 'cancel'},
              //  (this.props.locateApplication.locationPermission == 'undetermined') ?
                //  {text: 'OK', onPress: this._requestPermission.bind(this)},
                  // {text: 'Open Settings', onPress: this.handleClick()  }
             ]),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
          );
          this.watchID = navigator.geolocation.watchPosition((position) => {
            this.props.setRegion(position.coords.latitude, position.coords.longitude, '');
            // var lastPosition = JSON.stringify(position);
            // this.setState({lastPosition});
          });
        }
      }).catch(error => console.log('Failure'));
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
  }

  openSearchModal() {
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
                 ToastAndroid.CENTER)
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
          <Header>
            <Title onPress={() => this.openSearchModal()}>
                Welcome to Locate
            </Title>

            <Button onPress={() => this.openSearchModal()}>
                  <Icon name='ios-search'/>
            </Button>
          </Header>
          <Content>
              <Text style={styles.setMapInfoText}>
              Click an agent on the map.
              </Text>
              <View style ={styles.container}>
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

          <Footer>
            <View style={styles.continueButton}>
              <Button disabled={this.checkAgentSettingStatus()} iconRight info onPress={() => Actions.create_account() }>{ this.getRegisterButtonMessage() }</Button>
            </View>

            <View style={styles.loginButton}>
              <Button info onPress={() => Actions.create_account() }> LOGIN </Button>
            </View>
          </Footer>
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
    }
  }
}


// Styles
const styles = StyleSheet.create({
  setMapInfoText: {
    top: 3,
    bottom: 5,
    textAlign: 'center',
    color: 'gray'
  },
  container: {
  position: 'relative',
  top: 10,
  left: 0,
  right: 0,
  bottom: 0,
  height: 373,
  justifyContent: 'flex-end',
  alignItems: 'center',
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
  width: 213,
  left: 10,
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
}
});

export default connect(stateToProps, mapDispatchToProps)(SetAgent);
