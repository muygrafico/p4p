import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, fonts, othersTheme } from '../../Utils/theme';

const stylesBottom = StyleSheet.create({
  circleContainer: {
    alignItems:'center',
    justifyContent:'center',
  },
  cameraButton: {
    width: 45,
    height: 45,
    margin:0,
  },
  bottomBar: {
    alignItems: 'center',
    backgroundColor: colors.black,
    borderTopColor: colors.white,
    borderTopWidth: 2,
    bottom: 0,
    height: othersTheme.bottomBarHeight,
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 0,
  },
  buttonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '300',
    fontFamily: fonts.main,
    letterSpacing: .5,
    paddingTop: 10,
  }
});

class BottomBar extends React.Component {
  handleOnPress() {
    this.props.takePicture();
  }
  render() {
    return (
      <View style={stylesBottom.bottomBar}>
        <TouchableOpacity
          style={stylesBottom.circleContainer}
          onPress={() => this.handleOnPress()}
        >
          <Image style={stylesBottom.cameraButton} source={require('../../img/camera-button.png')} />
          <Text style={stylesBottom.buttonText}>push for photo</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default BottomBar;
