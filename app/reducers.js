
import { combineReducers } from 'redux';

/**
* We import our action types from actions.js
*/

import {
	SET_APPLICATION_STATUS,
  SET_MAP_REGION,
	ApplicationStates,
  InitialMapRegions,
	markerInfo,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  NUM_MARKER,
	CHANGE_MAP_SEARCH_STATUS,
	SET_LOCATION_PERMISSION,
	AgentSettingStates,
	SET_AGENT_STATUS,
	TOOGLE_CREATE_ACCOUNT_SPINNER,
	REQUEST_AGENTS,
	RECEIVE_AGENTS,
  SET_MY_AGENT_DETAILS,
  SET_REGISTRATION_FORM_DATA,
	START_REGISTRATION,
	RECEIVE_PARCELS
} from './actions';


/**
* We define our initial Application state tree
*/
const initialLocateState = {
		applicationStatus: ApplicationStates.OLD,
		agentSettingStatus: AgentSettingStates.NOT_SET,
		mapSearchStatus: 0,
		locationPermission: '',
		showCreateAccountForm: true,
		placeName: '',
		isFetchingAgents: true,
		registrationStarted: false,
    region: {
      latitude: InitialMapRegions.LATITUDE ,
      longitude: InitialMapRegions.LONGITUDE ,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    },
	 	locateAgent: 'LOCATE AGENT',
    numMarker: NUM_MARKER,
		createAccountSpinnerState: false,
		createAccountFormFields: [
			{
				field: 'name'
			},
			{
				field: 'email'
			},
			{
				field: 'phone_number'
			},
			{
				field: 'password'
			},
			{
				field: 'password_confirmation'
			}
		],
		userParcels: [
	  ],
		markerInfo: [
		// 	{
		// 	latitude: -1.102554,
		// 	longitude: 	37.013193,
		// 	 id: 1,
		//  },
		//  {
		//  latitude: -1.117069,
		//  longitude: 37.009166,
		// 	id: 2,
		// },
		// {
		// latitude: -1.093761,
		// longitude: 37.01958,
		//  id: 3,
		// },
		// {
		// latitude: -1.100396,
		// longitude: 37.014533,
		// id: 4,
		// },
		// {
		// 	latitude: -1.0358555,
		// 	longitude: 37.0732998,
		// 	id: 5,
		// }
	],
  myAgentDetails: [

  ],
	registrationFormData: [

	]
}

/**
* The Locate Application reducer
*/
function locateApplication(state = initialLocateState, action){
	switch (action.type) {
		case SET_APPLICATION_STATUS:
				return Object.assign({}, state, {
						applicationStatus: action.status
				})
			break;
		case SET_MAP_REGION:
			return Object.assign({}, state, {
						region: {
							latitude: action.latitude,
							longitude: action.longitude,
							latitudeDelta: LATITUDE_DELTA,
							longitudeDelta: LONGITUDE_DELTA
						},
						placeName: action.placeName
			})
			break;
		case CHANGE_MAP_SEARCH_STATUS:
			return Object.assign({}, state, {
						mapSearchStatus: action.status
			})
			break;
		case SET_LOCATION_PERMISSION:
			return Object.assign({}, state, {
						locationPermission: action.permission
			})
			break;
		case SET_AGENT_STATUS:
			return Object.assign({}, state, {
						agentSettingStatus: action.status
			})
			break;
		case TOOGLE_CREATE_ACCOUNT_SPINNER:
		return Object.assign({}, state, {
				  createAccountSpinnerState: action.status
		})
			break;
		case REQUEST_AGENTS	:
		return Object.assign({}, state, {
			isFetchingAgents: action.status,
		})
		 break;
		case RECEIVE_AGENTS:
		return Object.assign({}, state, {
			 isFetchingAgents: false,
			 markerInfo: action.markerInfo,
		})
		break;
    case SET_MY_AGENT_DETAILS:
    return Object.assign({}, state, {
       myAgentDetails: action.myAgentDetails,
    })
    break;
    case SET_REGISTRATION_FORM_DATA:
    return Object.assign({}, state, {
      registrationFormData: action.registrationFormData,
    })
    break;
		case START_REGISTRATION:
		return Object.assign({}, state, {
			registrationStarted: action.registrationStarted
		})
		break;
		case RECEIVE_PARCELS:
		return Object.assign({}, state, {
			userParcels: action.userParcels
		})
		break;
		default:
				return state;
	}
}

/*
* We combine our reducers and export it inorder to create a store
*/
const rootReducer = combineReducers({locateApplication});

export default rootReducer;
