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



import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Menu, { MenuContext} from 'react-native-menu';


import {
  StyleSheet,
} from 'react-native';

class LocateOne extends Component {

  checkAppInitialization(){
    if(this.props.locateApplication.applicationStatus === 'NEW'){
        return true;
    }

    return false;
  }

  render() {
    // console.log(this.props.locateApplication.numMarker);
    return (
      <MenuContext style={{flex: 1}}>
      <Router hideNavBar={true}>
        <Scene key="set_agent"
               component={SetAgent}
               initial={this.checkAppInitialization()}
               duration={0}/>
        <Scene key="create_account"
                component={CreateAccount}
                initial={!this.checkAppInitialization()}
                duration={0}/>
      <Scene key="show_spinner"
                component={ShowSpinner}
                duration={0}/>
      <Scene key="what_is_locate"
                component={WhatIsLocate}
                duration={0}/>
      <Scene key="shopper_parcel_dashboard"
                component={ShopperParcelDashboard}
                duration={0}/>
      <Scene key="parcel_view"
                 component={ParcelView}
                 duration={0}/>
      </Router>
      </MenuContext>

    );
  }
}

const stateToProps = (state) => {
  return {
      locateApplication: state.locateApplication
 	}
}


export default connect(stateToProps)(LocateOne);
