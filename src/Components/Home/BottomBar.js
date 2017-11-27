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
import { NavigationActions } from "react-navigation";
import {
  colors,
  fonts,
  othersTheme
} from '../../Utils/theme';
const { width, height } = Dimensions.get('window');

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimerMixin from 'react-timer-mixin';

import { calculatePercentage, calculateDimensions } from  '../../Utils';

const { margins, marginsx2, thumbYOffset, thumbWidth } = othersTheme;
const calculatedDimensions = calculateDimensions(width, height);
const {
  targetScalePercentage,
  previewHeight,
  bottomBarHeight,
  thumbBorderWidth,
  thumbHeight,
} = calculatedDimensions;

class BottomBar extends React.Component {
  state =  {
    countDown: 500,
    finish: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.uiPictureStatusAnimationEnd &&
      !nextProps.uiPictureStatusAnimationOngoin
  }

  handleOnPress() {
    this.props.takePicture();
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.bottomBar}>
        {this.props.photos &&
          this.props.photos.length > 0 &&
          <TouchableOpacity
            style={styles.thumbStatic}
            onPress={() => navigate('QueueList')}
            >
            { this.props.photos &&
              this.props.photos.length &&
              <Image
                source={{uri: this.props.photos.slice(-1).pop().url}}
                style={styles.picture}
              />
            }
            <Text style={styles.thumbStaticText}>
              {this.props.photos.length}
            </Text>
          </TouchableOpacity>
        }
        <View style={styles.circleContainer}>
          <TouchableOpacity
            onPress={() => this.handleOnPress()}
          >
            <Image style={styles.cameraButton}
              source={require('../../img/camera-button.png')}
            />
          </TouchableOpacity>
          <Text style={styles.buttonText}>push for photo</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    height: bottomBarHeight,
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
  },
  thumbStatic: {
    position: 'absolute',
    left: margins,
    top: (bottomBarHeight - thumbHeight)/2 - 3,
  },
  thumbStaticText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 11,
    marginTop: 5
  },
  picture: {
    width: thumbWidth,
    height: thumbHeight,
    borderWidth: thumbBorderWidth,
    borderColor: colors.white
  }
});

export default BottomBar;
