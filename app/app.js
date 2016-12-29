/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import SetAgent from './components/SetAgent';
import CreateAccount from './components/CreateAccount';
import ShowSpinner from './components/ShowSpinner';
import WhatIsLocate from './components/WhatIsLocate';
import ShopperParcelDashboard from './components/ShopperParcelDashboard';
import ParcelView from './components/ParcelView';
import SendAgentRequest from './components/SendAgentRequest';
import AgentRequestConfirmation from './components/AgentRequestConfirmation';
import AgentRequestAssessment from './components/AgentRequestAssessment';
import AgentRequestPassed from './components/AgentRequestPassed';
import AgentRequestFailed from './components/AgentRequestFailed';
import SendTransporterRequest from './components/SendTransporterRequest';
import Settings from './components/Settings';
import Account from './components/Account';
import ChangeMyPassword from './components/ChangeMyPassword';
import ChangeMyEmail from './components/ChangeMyEmail';
import ChangeMyNumber from './components/ChangeMyNumber';
import DeleteMyAccount from './components/DeleteMyAccount';
import PaymentSettings from './components/PaymentSettings';
import ChangeMaximumAmount from './components/ChangeMaximumAmount';
import NotificationSettings from './components/NotificationSettings';
import SMSNotification from './components/SMSNotification';
import EmailNotification from './components/EmailNotification';
import ChangeMyAgent from './components/ChangeMyAgent';
import AboutAndHelp from './components/AboutAndHelp';
import About from './components/About';
import ContactLocate from './components/ContactLocate';
import Login from './components/Login';
import EnsureLoggedInContainer from './components/EnsureLoggedInContainer';
import RootComponent from './components/RootComponent';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Menu, { MenuContext} from 'react-native-menu';


import {
  StyleSheet,
} from 'react-native';

const RouterWithRedux = connect()(Router);

class LocateOne extends Component {

  constructor(props) {
   super(props)
  }

  checkAppInitialization(){
    if(this.props.locateApplication.applicationStatus === 'NEW'){
        return true;
    }

    return false;
  }




  render() {
    return(
          <MenuContext style={{flex: 1}}>
          <RouterWithRedux hideNavBar={true}>
          <Scene key="root">

          <Scene key="shopper_parcel_dashboard"
                    component={ShopperParcelDashboard}
                    duration={0}/>
          <Scene key="parcel_view"
                     component={ParcelView}
                     duration={0}/>
          <Scene key="send_agent_request"
                 component={SendAgentRequest}
                 duration={0}
                 />
          <Scene key="show_spinner"
                    component={ShowSpinner}
                    duration={0}/>
          <Scene key="what_is_locate"
                    component={WhatIsLocate}
                    duration={0}/>
          <Scene key="agent_request_confirmation"
                 component={AgentRequestConfirmation}
                 duration={0}
                  />
          <Scene key="agent_request_assessment"
                  component={AgentRequestAssessment}
                  duration={0}
                  />
          <Scene key="agent_request_passed"
                 component={AgentRequestPassed}
                 duration={0}
                  />
          <Scene key="agent_request_failed"
                 component={AgentRequestFailed}
                 duration={0}
                  />
          <Scene key="send_transporter_request"
                 component={SendTransporterRequest}
                 duration={0}
                  />
          <Scene key="settings"
                 component={Settings}
                 duration={0}
                  />
          <Scene key="account"
                 component={Account}
                  duration={0}
                  />
          <Scene key="change_password"
                 component={ChangeMyPassword}
                 duration={0}
                  />
          <Scene key="change_email"
                 component={ChangeMyEmail}
                 duration={0}
                  />
          <Scene key="change_number"
                 component={ChangeMyNumber}
                 duration={0}
                 />
          <Scene key="delete_account"
                  component={DeleteMyAccount}
                  duration={0}
                 />
          <Scene key="payment_settings"
                 component={PaymentSettings}
                 duration={0}
                  />
          <Scene key="change_maximum_amount"
                 component={ChangeMaximumAmount}
                 duration={0}
                  />
          <Scene key="notification_settings"
                 component={NotificationSettings}
                 duration={0}
                />
          <Scene key="sms_notification"
                 component={SMSNotification}
                 duration={0}
                />
          <Scene key="email_notification"
                 component={EmailNotification}
                 duration={0}
                  />
          <Scene key="change_agent"
                 component={ChangeMyAgent}
                 duration={0}
                  />
          <Scene key="about_and_help"
                 component={AboutAndHelp}
                 duration={0}
                  />
          <Scene key="about"
                 component={About}
                 duration={0}
                  />
         <Scene key="contact_locate"
                component={ContactLocate}
                duration={0}
                />
          <Scene key="set_agent"
                  component={SetAgent}
                  initial={this.checkAppInitialization()}
                  duration={0}/>
          <Scene key="create_account"
                  component={CreateAccount}
                  initial={!this.checkAppInitialization()}
                  duration={0}/>
          <Scene key="login"
                  component={Login}
                  duration={0}
                  />
          <Scene key="login_from_reg"
                  component={Login}
                  duration={0}
                          />
          </Scene>
          </RouterWithRedux>
          </MenuContext>

        );
      }
    // console.log(this.props.locateApplication.numMarker);

}

const stateToProps = (state) => {
  return {
      locateApplication: state.locateApplication
 	}
}


export default connect(stateToProps)(LocateOne);
