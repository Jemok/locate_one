import React, { Component, PropTypes } from 'react'
import { View, UIManager, findNodeHandle, TouchableOpacity } from 'react-native'

const ICON_SIZE = 24

import {
  Button,
  Icon
} from 'native-base';

export default class PopupMenu extends Component {
  static propTypes = {
    // array of strings, will be list items of Menu
    actions:  PropTypes.arrayOf(PropTypes.string).isRequired,
    onPress: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      icon: null
    }
  }

  onError () {
    console.log('Popup Error')
  }

  onPress = () => {
    if (this.state.icon) {
      UIManager.showPopupMenu(
        findNodeHandle(this.state.icon),
        this.props.actions,
        this.onError,
        this.props.onPress
      )
    }
  }

  render () {
    return (
      <View>
        <Button onPress={this.onPress}>
          <Icon
            name='md-more'
            size={ICON_SIZE}
            color={'red'}
            ref={this.onRef} />
        </Button>
      </View>
    )
  }

  onRef = icon => {
    if (!this.state.icon) {
      this.setState({icon})
    }
  }
}
