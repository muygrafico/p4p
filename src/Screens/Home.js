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
import { savePhotoUrl } from '../actions/cameraActions';

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

  takePicture(e) {
    const options = {};
    this.setState({
      showPictureTaken: false
    })

    if (!this.state.showPictureTaken) {
      this.camera.capture({metadata: options})
      .then((data) => {
        this.setState({
          showPictureTaken: true,
          imageURL: data.path
        });
        this.props.savePhotoUrl(data.path);
      })
      .catch(err => console.error(err));
    }
  }

  componentDidMount() {
    this.props.fetchStorage('app-data');
    console.log(this.props.appData);
    // this.props.getAllKeys();
    // this.props.fetchStorage('app-data');
  }

  render() {
    const { session } = this.props;
    return (
      session ?
    (
      <View style={styles.appContainer}>
        <StatusBar hidden={true} />
        <View style={styles.livePreviewContainer}>
          {this.state.showPictureTaken &&
            <AnimatedImageContainer style={styles.AnimatedView}>
               <TouchableHighlight onPress={()=> this.navigate('QueueList')}>
                <Image
                  source={{uri: this.state.imageURL}}
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
              aspect={Camera.constants.Aspect.fill}>
            </Camera>
          </View>

        </View>
        <BottomBar takePicture={this.takePicture.bind(this)} />
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
    appData: state.appData
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStorage,
  savePhotoUrl,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithAPI(WithAuth(Home)));
