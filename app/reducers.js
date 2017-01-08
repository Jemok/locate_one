
import { combineReducers } from 'redux';

import routes from './routes';

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
	SET_LOGIN_FORM_DATA,
	START_REGISTRATION,
	START_LOGIN,
	RECEIVE_PARCELS,
	RECEIVE_AUTHENTICATION_RESPONSE,
	SET_APP_AS_NEW,
	SET_LOGIN_ERROR,
	SET_REDIRECT_URL,
	SET_USER_AS_LOGGED_IN,
	LOG_USER_OUT,
	TOGGLE_MY_LOCATION_SPINNER,
	TOGGLE_LOCATION_FAILED_MODAL,
	TOGGLE_LOCATION_FOUND_MODAL,
	TOGGLE_AGENT_SET_SUCCESS,
	CHANGE_CONNECTION_STATUS,
	SET_FIRST_NAME,
	SHOW_PASSWORD,
	SET_REGISTRATION_CONTACT_DATA,
	SET_REGISTRATION_PASSWORD_DATA
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
		getMyLocationSpinner: false,
		showPassword: true,
		isConnected: false,
		agentSet: false,
		placeName: '',
		isFetchingAgents: true,
		registrationStarted: false,
		locationFailedModal: false,
		locationFoundModal: false,
		loginStarted: false,
		isLoggedIn: false,
		redirect_url: null,
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
				field: 'first_name'
			},
			{
				field: 'last_name'
			}
		],
		emailAndPhoneFormFields: [
			{
				field: 'email'
			},
			{
				field: 'phone_number'
			}
		],
		passwordFormFields: [
			{
				field: 'password'
			}
		],
		loginFormFields: [
			{
				field: 'email'
			},
			{
				field: 'password'
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

	],
	registrationFormDataContact: [

	],
	registrationFormDataPassword:[

	],
	loginFormData: [

	],
	authenticationResponse: [

	],
	loginError: [

	],
	applicationUsers: [

	],
	currentUser: [

	],
	firstName: [

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
		case RECEIVE_AUTHENTICATION_RESPONSE:
		return Object.assign({}, state, {
			 authenticationResponse: action.authenticationResponse,
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
		case SET_REGISTRATION_CONTACT_DATA:
		return Object.assign({}, state, {
			registrationFormDataContact: action.registrationFormDataContact,
		})
		break;
		case SET_REGISTRATION_PASSWORD_DATA:
		return Object.assign({}, state, {
			registrationFormDataPassword: action.registrationFormDataPassword,
		})
		break;
		case SET_LOGIN_FORM_DATA:
		return Object.assign({}, state, {
			loginFormData: action.loginFormData,
		})
		break;
		case START_REGISTRATION:
		return Object.assign({}, state, {
			registrationStarted: action.registrationStarted
		})
		break;
		case START_LOGIN:
		return Object.assign({}, state, {
			loginStarted: action.loginStarted
		})
		break;
		case SET_USER_AS_LOGGED_IN:
		return Object.assign({}, state, {
			isLoggedIn: action.isLoggedIn
		})
		break;
		case RECEIVE_PARCELS:
		return Object.assign({}, state, {
			userParcels: action.userParcels
		})
		break;
		case SET_LOGIN_ERROR:
		return Object.assign({}, state, {
			loginError: action.loginError
		})
		break;
		case SET_REDIRECT_URL:
		return Object.assign({}, state, {
			redirectUrl: action.redirectUrl
		})
		break;
		case LOG_USER_OUT:
		return Object.assign({}, state, {
			isLoggedIn: action.isLoggedIn,
			authenticationResponse: action.authenticationResponse
		})
		break;
		case TOGGLE_LOCATION_FAILED_MODAL:
		return Object.assign({}, state, {
			locationFailedModal: action.locationFailedModal
		})
		break;
		case TOGGLE_LOCATION_FOUND_MODAL:
		return Object.assign({}, state, {
			locationFoundModal: action.locationFoundModal
		})
		break;
		case CHANGE_CONNECTION_STATUS:
		return Object.assign({}, state, {
			isConnected: action.isConnected,
		});
		break;
		case TOGGLE_MY_LOCATION_SPINNER:
		return Object.assign({}, state, {
			getMyLocationSpinner: action.getMyLocationSpinner
		})
		break;
		case TOGGLE_AGENT_SET_SUCCESS:
		return Object.assign({}, state, {
			agentSet: action.agentSet
		})
		break;
		case SET_FIRST_NAME:
		return Object.assign({}, state, {
			firstName: action.firstName
		})
		break;
		case SHOW_PASSWORD:
		return Object.assign({}, state, {
			showPassword: action.showPassword
		})
		break;
		case SET_APP_AS_NEW:
		return Object.assign({}, state, {
			applicationStatus: action.applicationStatus
		})
		default:
				return state;
	}
}

/*
* We combine our reducers and export it inorder to create a store
*/
const rootReducer = combineReducers({
	locateApplication,
	routes

});

export default rootReducer;
