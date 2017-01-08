'use strict';

import { Dimensions } from 'react-native';
import fetch from 'isomorphic-fetch';
import { Actions } from 'react-native-router-flux';

/*
* action types
*/

/**
* This action type describes an action that will change the
  status of the application, whether the apllication status is new or old, the
  new status will be the value 'NEW' and the old status will be value 'OLD' in the state store
*/
export const SET_APPLICATION_STATUS = 'SET_APPLICATION_STATUS';

/**
* This action type describes an action that will change the regions
* that will be used to display Locations on the map  after a Location
* search in google places
*/
export const SET_MAP_REGION = 'SET_MAP_REGION';

/**
* This action type describes an action that will get the current position
* of the device
*/
export const GET_CURRENT_POSITION = 'GET_CURRENT_POSITION';

/**
* This action type describes an action that will check whether a user
* has made a location search or not
*/
export const CHANGE_MAP_SEARCH_STATUS = 'CHANGE_MAP_SEARCH_STATUS';

/**
*This action type describes an action that will change the Location permission
*status of the device
*/
export const SET_LOCATION_PERMISSION = 'SET_LOCATION_PERMISSION';

/**
* This action type describes an action that will change the agent status to
* SET
*/
export const SET_AGENT_STATUS = 'SET_AGENT_STATUS';

/**
* Toogles the Loading Spinner for create account
*/
export const TOOGLE_CREATE_ACCOUNT_SPINNER = 'TOOGLE_CREATE_ACCOUNT_SPINNER';

/**
* An action type that initiates a request to
* get agents from the server
*/
export const REQUEST_AGENTS = 'REQUEST_AGENTS';

/**
* An action type that handes the process of receiving
* agents from the server
*/
export const RECEIVE_AGENTS = 'RECEIVE_AGENTS';

/**
* An action type that sets local agent details to application
* state
*/
export const SET_MY_AGENT_DETAILS = 'SET_MY_AGENT_DETAILS';

/**
* An action type that sets registration data to state
*/
export const SET_REGISTRATION_FORM_DATA = 'SET_REGISTRATION_FORM_DATA';

export const SET_REGISTRATION_CONTACT_DATA = 'SET_REGISTRATION_CONTACT_DATA';

export const SET_REGISTRATION_PASSWORD_DATA = 'SET_PASSWORD_DATA';

/**
*An action type that sets login data to state
*/
export const SET_LOGIN_FORM_DATA = 'SET_LOGIN_FORM_DATA';

/**
* Start the registration process
*/
export const START_REGISTRATION = 'START_REGISTRATION';

/**
*Start the login process
*/
export const START_LOGIN = 'START_LOGIN';

/**
* Receive the authentication response from the server after a user has been logged in
*/
export const RECEIVE_AUTHENTICATION_RESPONSE = 'RECEIVE_AUTHENTICATION_RESPONSE';

/**
*
*/
export const RECEIVE_PARCELS = 'RECEIVE_PARCELS';

export const SET_APP_AS_NEW = 'SET_APP_AS_NEW';

/*
* An action that sets the login errors that will be displayed to the user
*/
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

/**
* An action that sets the current redirect url
*/
export const SET_REDIRECT_URL = 'SET_REDIRECT_URL';

/**
* An action that sets a user as being logged in
*/
export const SET_USER_AS_LOGGED_IN = 'SET_USER_AS_LOGGED_IN';

/**
* An action that logs users out of the application
*/
export const LOG_USER_OUT = 'LOG_USER_OUT';

export const CHANGE_CONNECTION_STATUS = 'CHANGE_CONNECTION_STATUS';

/**
* An acion to get the current user from the API server
*/
export const GET_CURRENT_USER = 'GET_CURRENT_USER';

export const TOGGLE_MY_LOCATION_SPINNER = 'TOGGLE_MY_LOCATION_SPINNER';

export const TOGGLE_LOCATION_FAILED_MODAL = 'TOGGLE_LOCATION_FAILED_MODAL';

export const TOGGLE_LOCATION_FOUND_MODAL = 'TOGGLE_LOCATION_FOUND_MODAL';

export const TOGGLE_AGENT_SET_SUCCESS = 'TOGGLE_AGENT_SET_SUCCESS';

export const SET_FIRST_NAME = 'SET_FIRST_NAME';

export const SHOW_PASSWORD = 'SHOW_PASSWORD';

export function showPassword(value){
  return{
    type: SHOW_PASSWORD,
    showPassword: value
  }
}

export function setFirstName(value){
  return{
    type: SET_FIRST_NAME,
    firstName: value
  }
}


export function setAppAsNew(status){
  return{
    type: SET_APP_AS_NEW,
    applicationStatus: status
  }
}

export function agentSetSuccess(status){
  return{
    type: TOGGLE_AGENT_SET_SUCCESS,
    agentSet: status
  }
}

export function connectionState(status){
  return {
     type: CHANGE_CONNECTION_STATUS,
     isConnected: status
   }
}

export function toggleLocationFailedModal(status){
  return{
    type: TOGGLE_LOCATION_FAILED_MODAL,
    locationFailedModal: status
  }
}

export function toggleLocationFoundModal(status){
    return{
      type: TOGGLE_LOCATION_FOUND_MODAL,
      locationFoundModal: status
    }
}

export function toggleMyLocationSpinner(status){
  return{
    type: TOGGLE_MY_LOCATION_SPINNER,
    getMyLocationSpinner: status
  }
}

/**
* Definition of the action that gets the current user from the API server
*/

export function getCurrentUser(current_user){
  return{
    type: GET_CURRENT_USER,
    currentUser: current_user
  }
}

/**
* Log User out of application action
*/

export function systemLogOut() {
  return{
    type: LOG_USER_OUT,
    isLoggedIn: false,
    authenticationResponse: null
  }
}

/**
* Handle logging user out of the application
*/
export function logOut() {
   return function(dispatch) {
      dispatch(systemLogOut());
      dispatch(setAppAsNew(ApplicationStates.OLD));
      Actions.start_page({type: 'reset'});
   }
}



/**
* Set user as being logged in
*/
export function setUserAsLoggedIn(status) {
  return{
    type: SET_USER_AS_LOGGED_IN,
    isLoggedIn: status
  }
}

/**
* Save the current redirect url to the state of the application
*/
export function setRedirectUrl(redirect_url){
  return{
    type: SET_REDIRECT_URL,
    redirectUrl: redirect_url
  }
}

/**
* Set Login error action
*/
export function setLoginError(login_error) {
  return {
    type: SET_LOGIN_ERROR,
    loginError: login_error
  }
}


/**
* Registration process action creator
*/
export function startRegistrationProcess(status) {
  return{
    type: START_REGISTRATION,
    registrationStarted: status
  }

}

/**
*Login process action creator
*/
export function startUserLoginProcess(status){
  return{
    type: START_LOGIN,
    loginStarted: status
  }
}

/**
* Other constants
*/
/**
* Set my local agent details to the state
*/
export function setMyAgentDetails(agent_details) {
  return {
    type: SET_MY_AGENT_DETAILS,
    myAgentDetails: agent_details
  }
}

/**
*An action that creates registration from data
*/
export function registrationFormData(registrationFormData) {
  return {
    type: SET_REGISTRATION_FORM_DATA,
    registrationFormData: registrationFormData
  }
}

export function registrationContactData(registrationFormData){
  return{
    type: SET_REGISTRATION_CONTACT_DATA,
    registrationFormDataContact: registrationFormData
  }
}

export function registrationPasswordData(registrationFormData) {
  return{
    type: SET_REGISTRATION_PASSWORD_DATA,
    registrationFormDataPassword: registrationFormData
  }
}

/**
*An action that creates login form data
*/

export function loginFormData(loginFormData){
  return {
    type: SET_LOGIN_FORM_DATA,
    loginFormData: loginFormData
  }
}


/**
* Request agents from the api
*/
export function requestAgents(status){
  return {
    type: REQUEST_AGENTS,
    isFetchingAgents: status
  }
}

/**
* Receive agents from the api
*/
export function receiveAgents(json){
  console.log(json.data);
  return {
    type: RECEIVE_AGENTS,
    markerInfo: json.data
  }
}

/**
* Receive parcels from the api
*/
export function receiveParcels(json) {
    console.log(json.data);
    return {
      type: RECEIVE_PARCELS,
      userParcels: json.data
    }
}

/**
* Receive the authentication response from the api
*/
export function receiveAuthenticationResponse(json){
  // console.log(json);
  return {
    type: RECEIVE_AUTHENTICATION_RESPONSE,
    authenticationResponse: json
  }
}

export function registerAccount(action, action_contact, action_password, agent_details){
  // console.log('Agent who' +agent_details);
  return function (dispatch) {
    return fetch(`http://192.168.43.4:8000/api/auth/register`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
        name: action.first_name,
        email: action_contact.email,
        phone_number: action_contact.phone_number,
        password: action_password.password,
        password_confirmation: action_password.password,
        agent_id: agent_details.agent_id
      }
    )
    })
    .then(function(response) {
        console.log(response);
        if(response.status == 200){

          dispatch(setAppAsNew(ApplicationStates.NEW));

          dispatch(startRegistrationProcess(false));

          //dispatch(loginUser()
          Actions.login_from_reg({type: 'reset'});

        }else{
          throw new Error('Something went wrong on api server!');
        }
    })
    .then(function(response) {
        console.debug(response);
        // ...
    })
    .catch(function(error) {
        console.error(error);
    });
  }
}

export function loginUser(action, app_status) {
  return function (dispatch) {
    return fetch(`http://192.168.43.4:8000/oauth/token`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
        grant_type : "password",
	      client_id: 1,
	      client_secret : "soOkN59RG5KIS8GtorKTgzrjVlFndQfQj6F1HcgQ",
        username: action.email,
        password: action.password,
      }
    )
    })
    .then(response =>
      response.json().then(json => {
       if (response.status == 200) {

            dispatch(receiveAuthenticationResponse(json));

            dispatch(startUserLoginProcess(false));

            dispatch(setUserAsLoggedIn(true));

            if(app_status === 'NEW'){
              Actions.what_is_locate({type: 'reset'});
            }else {
              Actions.shopper_parcel_dashboard({type: 'reset'});
            }

       }else {
         dispatch(setLoginError(json));
       }


      // if(response.status == 200){
      //   Actions.shopper_parcel_dashboard;
      // }
      //
      // response.json().then()

    })
    // .then(function(data)
    //  {
    //     console.log('response here');
    //     // console.log(data);
    //     // if(response.status == 200){
    //
    //
    //     // }else{
    //     //   throw new Error('Something went wrong on api server!');
    //     // }
    // });
  )
}
}

export function fetchAgents(action) {
  return function (dispatch) {
    return fetch(`http://192.168.43.4:8000/api/locations`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveAgents(json))
      )
  }
}

export function getMyParcels(action) {
  return function (dispatch) {
    return fetch(`http://192.168.43.4:8000/api/parcels`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveParcels(json))
      )
  }
}



export const ApplicationStates = {
    NEW: 'NEW',
    OLD: 'OLD'
}

export const AgentSettingStates = {
  SET: 'SET',
  NOT_SET: 'NOT_SET'
}

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
export const LATITUDE_DELTA = 0.02;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export const NUM_MARKER = 1;

export const InitialMapRegions = {
  LATITUDE:  -1.1025542,
  LONGITUDE: 37.013192600000025,
}

/*
* action creators
*/

/**
* This action creator creates an object action of type SET_APPLICATION_STATUS,
* and has the status of the application
*/
export function setApplicationStatus(status){
  return { type: SET_APPLICATION_STATUS, status }
}

/**
* This action creator creates an object action of type SET_MAP_REGION,
* and has the status of the application
*/
export function setNewMapRegion(latitude, longitude, placeName = ''){
  return { type: SET_MAP_REGION, latitude, longitude, placeName }
}

/**
* This action creator creates an object of type CHANGE_MAP_SEARCH_STATUS
*/
export function changeMapSearchStatus(status) {
  return {type: CHANGE_MAP_SEARCH_STATUS, status}
}

/**
* This action creator creates an action of type SET_LOCATION_PERMISSION
* which changes the Location Permission
*/

export function setLocationPermission(permission) {
  return {type: SET_LOCATION_PERMISSION, permission}
}

/**
* This action creator creates an action of type SET_AGENT_STATUS
* which changes the SET AGENT STATUS
*/
export function setAgentStatus(status) {
  return {type: SET_AGENT_STATUS, status}
}

/**
* This action creator creates an action of type TOOGLE_CREATE_ACCOUNT_SPINNER
*/

export function toogleCreateAccountLoadingSpinner(status){
  return {type: TOOGLE_CREATE_ACCOUNT_SPINNER, status}
}
