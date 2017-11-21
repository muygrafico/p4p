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
import { colors, fonts, othersTheme } from '../Utils/theme';
import AnimatedImageContainer from '../Components/Home/AnimatedImageContainer';
import BottomBar from '../Components/Home/BottomBar';
import { WithAPI } from '../lib/Categories/API/Components';
import { WithAuth } from '../lib/Categories/Auth/Components';
import { WithStorage } from '../lib/Categories/Storage/Components';

import { fetchStorage } from '../actions/storageActions';
import { savePhotoUrl, startPictureAnimation, onPictureAnimation } from '../actions/cameraActions';


import RNFetchBlob from 'react-native-fetch-blob';
import { Buffer } from 'buffer';
import AWS from 'aws-sdk';

const {height, width} = Dimensions.get('window');

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

    TimerMixin.setTimeout(
      () =>
      this.props.navigation.dispatch(navigateToAutoLogin), 150
    );
  }

  readFile = (urlLocal) => new Promise((resolve) => {
    let data = '';

    RNFetchBlob.fs.readStream(urlLocal, 'base64', 4095)
      .then((ifstream) => {
        ifstream.open()
        ifstream.onData((chunk) => {
          data += chunk
        })
        ifstream.onError((err) => {
          console.log('oops', err)
        })
        ifstream.onEnd(() => {
          resolve(data)
        })
      })
  })

  async handleUploadFile(urlLocal) {
    const url = urlLocal;
    const [, fileName, extension] = /.*\/(.+)\.(\w+)$/.exec(url);
    const { IdentityId } = AWS.config.credentials.data;
    const key = `private/${IdentityId}/${fileName}`;
    let objectUrl = null;

    try {
      const data = await this.readFile(urlLocal);
      const upload = await this.props.storage.putObject(key, new Buffer(data, 'base64'), 'image/jpeg');
    } catch (err) {
      console.warn(err);
    }

    // TODO check if should load local or server images
    // this.setState({ objectUrl });
  }

  takePicture(e) {
    const options = {};

    if (!this.props.uiPictureStatusAnimationOngoin) {
      // this.props.startPictureAnimation();
      this.props.onPictureAnimation();
      this.camera.capture({metadata: options})
      .then((data) => {
        // this.setState({
        //   showPictureTaken: true,
        //   imageURL: data.path
        // });
        this.props.savePhotoUrl(data.path);
        // this.handleUploadFile(data.path);
      })
      .catch(err => console.error(err));
    }
  }

  componentDidMount() {
    this.props.fetchStorage('app-data');
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);
  //   return nextProps.uiPictureStatusAnimationEnd;
  // }
  //
  // componentDidReceiveProps(prevProps) {
  //   console.log(prevProps);
  //   return this.props.uiPictureStatusAnimationEnd;
  // }

  render() {
    const { session } = this.props;
    // console.log(this.props.uiPictureStatusAnimationStart);
    // console.log(this.props.uiPictureStatusAnimationOngoin);
    // console.log(this.props.uiPictureStatusAnimationEnd);
    return (
      session ?
    (
      <View style={styles.appContainer}>
        <StatusBar hidden={true} />
        <View style={styles.livePreviewContainer}>
          {this.props.uiPictureStatusAnimationOngoin &&
            this.props.photos && this.props.photos.length > 0 &&
            <AnimatedImageContainer style={styles.AnimatedView}>
               <TouchableHighlight onPress={()=> this.navigate('QueueList')}>
                <Image
                  source={{uri: this.props.photos.slice(-1).pop().url}}
                  style={styles.picturePreview}
                />
              </TouchableHighlight>
            </AnimatedImageContainer>
          }

          <View>
            <Camera
              ref={cam => this.camera = cam}
              style={styles.camera}
              captureTarget={Camera.constants.CaptureTarget.disk}
              captureQuality={Camera.constants.CaptureQuality.photo}
              aspect={Camera.constants.Aspect.fill}>
            </Camera>
          </View>

        </View>

        <BottomBar
          takePicture={this.takePicture.bind(this)}
          {...this.props}
        />
      </View>
    )
     :
     this.navigate('AutoLogin')
    );
  }
};

const styles = StyleSheet.create({
  appContainer: {
    width: '100%',
    height: '100%',
  },
  livePreviewContainer: {
    height: height - (othersTheme.bottomBarHeight + othersTheme.marginsx2),
    width:'100%',
    zIndex: 2,
  },
  livePreview: {
    borderWidth: othersTheme.margins,
  },
  AnimatedView: {
    borderColor: colors.white,
    borderWidth: othersTheme.margins,
    height: height - othersTheme.bottomBarHeight,
    position: 'absolute',
    width: width,
    zIndex: 1,
  },
  picturePreview: {
    height: '100%',
    position: 'relative',
    width: '100%',
  },
  camera: {
    left: othersTheme.margins,
    top: othersTheme.margins,
    height: height - (othersTheme.bottomBarHeight + othersTheme.marginsx2),
    width: width - othersTheme.marginsx2,
  },
});

function mapStateToProps (state) {
  return {
    appData: state.appData,
    photos: state.appData.storage.data.photos,
    uiPictureStatusAnimationStart: state.ui.picturePreview.animationStart,
    uiPictureStatusAnimationOngoin: state.ui.picturePreview.animationOngoin,
    uiPictureStatusAnimationEnd: state.ui.picturePreview.animationEnd,
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStorage,
  savePhotoUrl,
  startPictureAnimation,
  onPictureAnimation,
}, dispatch);

export default
  WithAuth(
    WithStorage(
      WithAPI(
        connect(mapStateToProps,mapDispatchToProps)(Home)
      )
    )
  );
