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
import { Icon } from 'react-native-elements';
import { AutoSignIn } from '../../lib/Categories/Auth/Components/Examples';
import Camera from 'react-native-camera';
import { colors, fonts, othersTheme } from '../Utils/theme';
const {height, width} = Dimensions.get('window');
import AnimatedImageContainer from '../Components/Home/AnimatedImageContainer';
import BottomBar from '../Components/Home/BottomBar';

class Home extends React.Component {

  state = {
    showPictureTaken: false,
    imageURL: null
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
        })
      })
      .catch(err => console.error(err));
    }
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
              <Image
                source={{uri: this.state.imageURL}}
                style={styles.picturePreview}
              />
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
     (<View style={styles.appContainer}>
       <AutoSignIn {...this.props} />
     </View>)
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

export default Home;
