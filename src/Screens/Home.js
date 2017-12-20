import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';

import { actions as storageActions } from 'react-native-redux-storage-middleware';
import { NavigationActions } from "react-navigation";

import Camera from 'react-native-camera';
import TimerMixin from 'react-timer-mixin';

import { AutoSignIn } from '../lib/Categories/Auth/Components/Examples';
import { colors, fonts } from '../Utils/theme';
import AnimatedImageContainer from '../Components/Home/AnimatedImageContainer';
import BottomBar from '../Components/Home/BottomBar';
import { WithAPI } from '../lib/Categories/API/Components';
import { WithAuth } from '../lib/Categories/Auth/Components';
import { WithStorage } from '../lib/Categories/Storage/Components';
import { fetchStorage } from '../actions/storageActions';
import { savePhotoUrl } from '../actions/cameraActions';
import RNFetchBlob from 'react-native-fetch-blob';
import { Buffer } from 'buffer';
import AWS from 'aws-sdk';

import BackgroundTask from 'react-native-background-task';


import { calculateDimensions, readFile, handleUploadFile, consoleLogList } from  '../Utils';

const {height, width} = Dimensions.get('window');

const calculatedDimensions = calculateDimensions(width, height);
const {
  targetScalePercentage,
  previewHeight,
  bottomBarHeight,
  borderWidth,
  thumbHeight,
  margins,
  marginsx2,
  thumbWidth,
} = calculatedDimensions;

BackgroundTask.define(async () => {
  // Fetch some data over the network which we want the user to have an up-to-
  // date copy of, even if they have no network when using the app
  // const response = await fetch('http://feeds.bbci.co.uk/news/rss.xml')
  // const text = await response.text()

  console.log('bla');

  // Data persisted to AsyncStorage can later be accessed by the foreground app
  // await AsyncStorage.setItem('@MyApp:key', text)

  // Remember to call finish()
  BackgroundTask.finish()
})

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = this.navigate.bind(this);
  }

  state = {
    showPictureTaken: false,
    imageURL: null
  }

  navigate (where) {
    let navigateToAutoLogin =
      NavigationActions.navigate({
        routeName: where
      });

      this.props.navigation.dispatch(navigateToAutoLogin)
  }

  takePicture(e) {
    const options = {};
    const { IdentityId } = AWS.config.credentials.data;
    console.log(IdentityId);
    const storage = this.props.storage;

    if (!this.props.uiPictureStatusAnimationOngoin) {
      this.camera.capture({metadata: options})
      .then((data) => {
        this.setState({imageURL: data.path});
        this.props.savePhotoUrl(data.path);
        handleUploadFile(data.path, IdentityId, storage);
      })
      .catch(err => console.error(err));
    }
  }

  componentDidMount() {
    this.props.fetchStorage('app-data');
    const { photos, storage } = this.props;

    // const AWSLocal = JSON.parse(this.props.appData.storage.data.awsCredentials);
    // TimerMixin.setTimeout(
    //   () => {
    //     const { IdentityId } = AWS.config.credentials.data;
    //     console.log(IdentityId);
    //   }
    //   , 250
    // );

    BackgroundTask.schedule();
     // consoleLogList(photos, IdentityId, storage);
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <StatusBar hidden={true} />
        <View style={styles.livePreviewContainer}>
          {
            this.props.uiPictureStatusAnimationOngoin &&
            this.state.imageURL &&
            <AnimatedImageContainer
              style={styles.AnimatedView}
              {...this.props}
              >
               <TouchableHighlight onPress={()=> this.navigate('QueueList')}>
                <Image
                  source={{uri: this.state.imageURL}}
                  style={styles.picturePreview}
                />
              </TouchableHighlight>
            </AnimatedImageContainer>
          }

          <Camera
            ref={cam => this.camera = cam}
            style={styles.camera}
            captureTarget={Camera.constants.CaptureTarget.disk}
            captureQuality={Camera.constants.CaptureQuality.photo}
            aspect={Camera.constants.Aspect.fill}>
          </Camera>

        </View>

        <BottomBar
          takePicture={this.takePicture.bind(this)}
          {...this.props}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  appContainer: {
    width,
    height,
  },
  livePreviewContainer: {
    height: height - (bottomBarHeight + marginsx2),
    width,
    zIndex: 2,
    position: 'absolute'
  },
  AnimatedView: {
    borderColor: colors.white,
    height: height - bottomBarHeight,
    position: 'absolute',
    width: width,
    zIndex: 1,
  },
  picturePreview: {
    height: height - (bottomBarHeight),
    width: width,
    borderWidth: 15,
    borderColor: colors.white
  },
  camera: {
    left: margins,
    top: margins,
    height: height - (bottomBarHeight + marginsx2),
    width: width - marginsx2,
  },
});

function mapStateToProps (state) {
  return {
    appData: state.appData,
    photos: state.appData.storage.photos,
    uiPictureStatusAnimationStart: state.ui.picturePreview.animationStart,
    uiPictureStatusAnimationOngoin: state.ui.picturePreview.animationOngoin,
    uiPictureStatusAnimationEnd: state.ui.picturePreview.animationEnd,
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStorage,
  savePhotoUrl,
}, dispatch);

export default
  WithAuth(
    WithStorage(
      WithAPI(
        connect(mapStateToProps,mapDispatchToProps)(Home)
      )
    )
  );
