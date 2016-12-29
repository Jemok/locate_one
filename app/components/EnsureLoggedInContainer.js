import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';


class EnsureLoggedInContainer extends Component {
  componentDidMount() {

    if (!this.props.locateApplication.isLoggedIn) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      this.props.saveRedirectUrl(this.props.routes.scene.key)

      Actions.login();
    }
  }

  render() {
    if (this.props.locateApplication.isLoggedIn) {
      return this.props.children;
    } else {
      return this.props.children;
    }
  }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps(state) {
  return {
    routes: state.routes,
    locateApplication: state.locateApplication
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveRedirectUrl: (redirect_url) => {
        dispatch(setRedirectUrl(redirect_url))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnsureLoggedInContainer)
