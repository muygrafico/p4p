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
import { colors, fonts, othersTheme } from '../../Utils/theme';
const {height, width} = Dimensions.get('window');

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
  },
  thumbStatic: {
    position: 'absolute',
    left: 15,
    top: (othersTheme.bottomBarHeight - othersTheme.thumbHeight)/2 - 5,
  },
  thumbStaticText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 11,
    marginTop: 5
  },
  picture: {
    width: 50,
    height: 70,
    borderWidth: 5,
    borderColor: colors.white
  }
});

class BottomBar extends React.Component {

  state = {
    pictureUrl: null,
  }

  // componentWillReceiveProps(nextProps) {
  //   if nextProps.uiPicturePreview !== this.props.uiPicturePreview
  // }

  componentDidReceiveProps(nextProps) {
      if (nextProps.uiPictureStatusAnimationEnd !== this.props.uiPictureStatusAnimationEnd)
     {
       console.log(nextProps);
      // this.setState({pictureUrl: this.props.photos.slice(-1).pop().url})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.uiPictureStatusAnimationEnd &&
      !nextProps.uiPictureStatusAnimationOngoin
  }
  //
  // componentDidMount() {
  //   // this.props.uiPictureStatusAnimationEnd &&
  //   this.props.photos && this.props.photos.length > 0 ?
  //   this.setState({pictureUrl: this.props.photos.slice(-1).pop().url})
  //   :
  //   null
  // }

  handleOnPress() {
    this.props.takePicture();
    // this.setState({pictureUrl: this.props.photos.slice(-1).pop().url})
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.bottomBar}>
        {this.props.photos &&
          this.props.photos.length > 0 &&
          <TouchableOpacity
            style={styles.thumbStatic}
            onPress={() => navigate('QueueList', {name: 'Brent'})}
            >
            { this.props.photos && this.props.photos.length &&

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
        <TouchableOpacity
          style={styles.circleContainer}
          onPress={() => this.handleOnPress()}
        >
          <Image style={styles.cameraButton}
            source={require('../../img/camera-button.png')}
          />
          <Text style={styles.buttonText}>push for photo</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default BottomBar;
