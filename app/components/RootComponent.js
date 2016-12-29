import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';


class RootComponent extends Component {


  componentDidUpdate(prevProps) {
    //const { dispatch, redirectUrl } = this.props
    const isLoggingOut = prevProps.isLoggedIn && !this.props.locateApplication.isLoggedIn
    const isLoggingIn = !prevProps.isLoggedIn && this.props.locateApplication.isLoggedIn

    if (isLoggingIn) {
      Actions.shopper_parcel_dashboard();
    } else if (isLoggingOut) {
      // do any kind of cleanup or post-logout redirection here
    }
  }

  render() {
    return this.props.children
  }
}

function mapStateToProps(state) {
  return {
    routes: state.routes,
    locateApplication: state.locateApplication
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToUrl: (redirect_url) => {
        dispatch(navigateToUrl(redirect_url))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootComponent)
