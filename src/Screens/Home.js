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
import AnimatedImageContainer from '../Components/AnimatedImageContainer';
import { colors, fonts, others } from '../Utils/theme';
const {height, width} = Dimensions.get('window');

class Home extends React.Component {

  state = {
    objectUrl: null,
    apiResponse: null,
    showPreview: false,
    imageData: null
  }

  handleResponse(response) {
    return JSON.stringify(response)
  }

  takePicture() {
    const options = {};

    this.setState({
      showPreview: false
    })

    if (!this.state.showPreview) {
      this.camera.capture({metadata: options})
      .then((data) => {
        this.setState({
          showPreview: true,
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

          {this.state.showPreview &&
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
        <View style={stylesBottom.bottomBar}>

          <TouchableOpacity
            style={stylesBottom.circleContainer}
            onPress={this.takePicture.bind(this)}
          >
            <Image style={stylesBottom.cameraButton} source={require('../../img/camera-button.png')} />
            <Text style={stylesBottom.buttonText}>push for photo</Text>
          </TouchableOpacity>
        </View>
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
    height: height - 130,
    width:'100%',
    zIndex: 2,
  },
  livePreview: {
    borderWidth: 15,
  },
  AnimatedView: {
    borderColor: colors.white,
    borderWidth: 15,
    height: height - others.bottomBarHeight,
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
    left: 15,
    top: 15,
    height: height - (others.bottomBarHeight + 30),
    width: width - 30,
  },
});

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
    height: others.bottomBarHeight,
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 0,
  },
  buttonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '300',
    letterSpacing: .5,
    paddingTop: 10,
  }
});

export default Home;
