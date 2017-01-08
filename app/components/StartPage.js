
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
  Card,
  CardItem
} from 'native-base';
import Permissions from 'react-native-permissions';
// import RNAndroidLocationEnabler from 'react-native-android-location-enabler';



import { connect } from 'react-redux';

import {
  setNewMapRegion,
  fetchAgents
} from '../actions';

class StartPage extends Component {
componentDidMount() {
  this.props.getAgents();

  // RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
  // .then(data => {
  //   // The user has accepted to enable the location services
  //   // data can be :
  //   //  - "already-enabled" if the location services has been already enabled
  //   //  - "enabled" if user has clicked on OK button in the popup
  //   console.log('The location data is'+ data);
  // }).catch(err => {
  //   // The user has not accepted to enable the location services or something went wrong during the process
  //   // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
  //   // codes :
  //   //  - ERR00 : The user has clicked on Cancel button in the popup
  //   //  - ERR01 : If the Settings change are unavailable
  //   //  - ERR02 : If the popup has failed to open
  //   console.log('The location error is'+ err);
  // });

  // Permissions.getPermissionStatus('location')
  //   .then((response) => {
  //     //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
  //     this.props.setNewLocationPermission(response);
  //     console.log('Location Permission is '+response);
  //       if(this.props.locateApplication.locationPermission === 'authorized'){
  //         navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           console.log(position.coords.latitude, position.coords.longitude);
  //           this.props.setRegion(position.coords.latitude, position.coords.longitude, '');
  //         },
  //         (error) =>
  //         // Alert.alert( 'Location access ?',
  //         //  'Locate determines your phone’s location for a better overall app experience.',
  //         //  [
  //         //    {text: 'Go to setings and turn on your location', onPress: () => console.log('permission denied'), style: 'cancel'},
  //         //   (this.props.locateApplication.locationPermission == 'undetermined') ?
  //         //     {text: 'OK', onPress: this._requestPermission.bind(this)},
  //         //     {text: 'Open Settings', onPress: this.handleClick()  }
  //         //  ])
  //
  //         Alert.alert(
  //           'Turn on device Location',
  //           'This will help us to deliver your parcels, enable location access in your device settings then continue ',
  //           [
  //             {text: 'No way', onPress: () => console.log('permission denied'), style: 'cancel'},
  //             // this.props.locateApplication.locationPermission === 'undetermined'?
  //               {text: 'OK', onPress: this._requestPermission.bind(this)}
  //               // : {text: 'Open Settings', onPress: Permissions.openSettings}
  //           ]
  //         )
  //          ,
  //         {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
  //       );
  //       this.watchID = navigator.geolocation.watchPosition((position) => {
  //         this.props.setRegion(position.coords.latitude, position.coords.longitude, '');
  //         // var lastPosition = JSON.stringify(position);
  //         // this.setState({lastPosition});
  //       });
  //     }
  //   }).catch(error => console.log('Failure'));
}

render() {
    return (
      <Container style={styles.componentContainer}>
        <Content>
          <View style={styles.createAccountTextView}>
            <Text style={styles.appNameText}>
                  Locate
            </Text>

            <Text style={styles.appLogoText}>
                  Loc
            </Text>

            <Text onPress={() => Actions.login()} style={styles.loginToAccountText}>
                  Log Into Locate
            </Text>

            <Text style={styles.createAccountText} onPress={() => Actions.set_agent()}>
                    Create A New Locate Account
              </Text>

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

const mapDispatchToProps = (dispatch) => {
  return {
    getAgents: () => {
      dispatch(fetchAgents())
    },
    setRegion: (latitude, longitude, placeName) => {
      dispatch(setNewMapRegion(latitude, longitude, placeName))
    }
  }
}


// Styles
const styles = StyleSheet.create({
  componentContainer: {
    backgroundColor: '#3aaf85'
  },
  createAccountTextView:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  loginToAccountText: {
    color: '#FFFFFF',
    marginTop: 200,
    padding: 5
  },
  createAccountText: {
    color: '#FFFFFF',
    fontFamily: 'Loma',
    marginTop: 10,
    padding: 5
  },
  appNameText: {
    color: '#FFFFFF',
    paddingTop: 15,
    fontFamily: 'Loma',
    fontSize: 20
  },
  createAccountButton: {
    marginTop: 30,
    alignSelf: 'center'
  },
  appLogoText: {
    fontFamily: 'Roboto',
    color: '#FFFFFF',
    marginTop: 70,
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 60
  }
});

export default connect(stateToProps, mapDispatchToProps)(StartPage);
