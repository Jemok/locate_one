
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

/**
* Start the registration process
*/
export const START_REGISTRATION = 'START_REGISTRATION';

/**
*
*/
export const RECEIVE_PARCELS = 'RECEIVE_PARCELS';



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

export function receiveParcels(json) {
    console.log(json.data);
    return {
      type: RECEIVE_PARCELS,
      userParcels: json.data
    }
}

export function registerAccount(action){
  console.log(action.name);
  return function (dispatch) {
    return fetch(`http://192.168.43.4:8000/api/auth/register`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
        name: action.name,
        email: action.email,
        phone_number: action.phone_number,
        password: action.password,
        password_confirmation: action.password_confirmation
      }
    )
    })
    .then(function(response) {
        console.log('seeeeex');
        console.log(response);
        if(response.status == 200){

          console.log('gay shiiit!!');

          dispatch(startRegistrationProcess(false));

          Actions.what_is_locate();

        }else{
          console.log('lesbian shiiit!!');
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
