import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  StatusBar,
  Image } from 'react-native';
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

class Home extends React.Component {

  state = {
    objectUrl: null,
    apiResponse: null,
    showPreview: false,
    imageData: null
  }

  async handleCallAPI() {
    const { api } = this.props;
    const cloudLogicArray = JSON.parse(awsmobile.aws_cloud_logic_custom); // Get endpoint
    const endPoint = cloudLogicArray[0].endpoint;
    const requestParams = {
      method: 'GET',
      url: endPoint + '/items/pets',
    };

    let apiResponse = null;

    try {
      apiResponse = await api.restRequest(requestParams);
    } catch (err) {
      console.warn(err);
    }

    this.setState({ apiResponse });
  }

  handleResponse(response) {
    return JSON.stringify(response)
  }

  takePicture() {
    const options = {};
    //options.location = ...
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
        <StatusBar
           hidden={true}
         />
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
            <View style={styles.livePreview}>
              <Image
                source={{uri: this.state.imageURL, isStatic:true}}
                style={styles.livePreview}
              />
            </View>
          }
            <View style={styles.bottomBar}>

              <TouchableOpacity
                style={styles.circle}
                  onPress={this.takePicture.bind(this)}
              >
                {/* <Icon name={"chevron-right"}  size={30} color="#01a699" /> */}
                <Image style={styles.cameraButton} source={require('../../img/camera-button.png')} />
                <Text style={styles.buttonText}>push for photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    )
     :
     (<View style={styles.container}>
       <AutoSignIn {...this.props} />
     </View>)
    );
  }
};


const styles = StyleSheet.create({
  circle: {
    alignItems:'center',
    justifyContent:'center'
  },
  cameraButton: {
    width: 45,
    height: 45,
    margin:0
  },
  appContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'blue',
  },
  livePreviewContainer: {
    backgroundColor: '#fff',
    width:'100%',
    height:'100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 20,

  },
  livePreview: {
    flex: 1,
    padding: 15,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 15,
  },
  captureButton: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    color: '#000',
    padding: 10,
    margin: 40,
    marginBottom: 200
  },
  bottomBar: {
    flex: 0.2,
    borderTopColor: 'white',
    borderTopWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#282828',
    bottom: 0,
    height: 80
  },
  buttonText: {
    color: 'white',
    paddingTop: 10,
    fontWeight: '300',
    letterSpacing: .5,
    fontSize: 13
  }
});

export default Home;
