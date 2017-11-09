import React from 'react';
import {
  Animated,
  Button,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AWS from 'aws-sdk';
import { Icon } from 'react-native-elements';
import RNFetchBlob from 'react-native-fetch-blob';
import { Buffer } from 'buffer';
import { AutoSignIn, SignUp } from '../../lib/Categories/Auth/Components/Examples';
import awsmobile from '../../aws-exports';
import Camera from 'react-native-camera';
import { TimelineLite } from 'gsap';
import SvgUri from 'react-native-svg-uri';
import handleUploadFile from '../Utils/upload-file';
import AnimatedImageContainer from '../Components/AnimatedImageContainer';

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
          {!this.state.showPreview &&
            <View style={styles.livePreview}>
              <Camera
                ref={cam => this.camera = cam}
                style={styles.camera}
                captureTarget={Camera.constants.CaptureTarget.disk}
                aspect={Camera.constants.Aspect.fill}>
              </Camera>
          </View>
          }
          {this.state.showPreview &&
            <AnimatedImageContainer style={styles.AnimatedView}>
              <Image
                source={{uri: this.state.imageURL}}
                style={styles.picturePreview}
              />
            </AnimatedImageContainer>
          }

          </View>
          <View style={stylesBottom.bottomBar}>

            <TouchableOpacity
              style={stylesBottom.circleContainer}
                onPress={this.takePicture.bind(this)}
            >
              {/* <Icon name={"chevron-right"}  size={30} color="#01a699" /> */}
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
  AnimatedView: {
  },
  appContainer: {

  },
  livePreviewContainer: {
    width:'100%',
    height:'100%',
  },
  livePreview: {
    // padding: 15,
  },
  AnimatedView: {
    width: width - 30,
    height: height - 130,
    marginTop: 15,
    marginLeft: 15,
  },
  picturePreview: {
    width: '100%',
    height: '100%',
    position: 'relative',
    // display: 'flex'
  },
  camera: {
    width: width - 30,
    height: height - 130,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
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
    backgroundColor: '#282828',
    borderTopColor: 'white',
    borderTopWidth: 2,
    bottom: 0,
    height: 100,
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '300',
    letterSpacing: .5,
    paddingTop: 10,
  }
});

export default Home;
