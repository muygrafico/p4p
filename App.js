import React from 'react';
// import { DrawerNavigator } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image } from 'react-native';
import AWS from 'aws-sdk';
import RNFetchBlob from 'react-native-fetch-blob';
import { Buffer } from 'buffer';
import { WithAPI } from './lib/Categories/API/Components';
import { WithAuth } from './lib/Categories/Auth/Components';
import { WithStorage } from './lib/Categories/Storage/Components';
import { AutoSignIn, SignUp } from './lib/Categories/Auth/Components/Examples';
import awsmobile from './aws-exports';
import Camera from 'react-native-camera';

export default WithStorage(WithAPI(WithAuth(class App extends React.Component {

  state = {
    objectUrl: null,
    apiResponse: null,
    showPreview: false,
    imageData: null
  }

  async handleUploadFile() {
    // const url = 'https://awsmedia.s3.amazonaws.com/AWS_Logo_PoweredBy_127px.png';
    const url = 'https://www.parrolabs.com/assets/images/posts/react-native.png';

    const [, fileName, extension] = /.*\/(.+)\.(\w+)$/.exec(url);

    // Get cognito identity for the signed in user
    const { IdentityId } = AWS.config.credentials.data;

    // File will be uploaded to the user's private space in the S3 bucket
    const key = `private/${IdentityId}/${fileName}`;

    let objectUrl = null;

    try {
      // Download file from the internet.
      const download = await RNFetchBlob.fetch('GET', url);
      const { data } = download;
      const { respInfo: { headers: { 'Content-Type': contentType } } } = download;

      // Upload the file
      const upload = await this.props.storage.putObject(key, new Buffer(data, 'base64'), contentType);

      // Get url for stored object. This is an S3 presigned url. See: http://docs.aws.amazon.com/AmazonS3/latest/dev/ShareObjectPreSignedURL.html
      objectUrl = this.props.storage.getObjectUrl(upload.key);

      console.log(objectUrl);
    } catch (err) {
      console.warn(err);
    }

    this.setState({ objectUrl });
  }

  async handleCallAPI() {
    const { api } = this.props;

    // Get endpoint
    const cloudLogicArray = JSON.parse(awsmobile.aws_cloud_logic_custom);
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
    this.camera.capture({metadata: options})
    .then((data) => {
      console.log(data)
      console.log(data.temp);
      this.setState({
        showPreview: true,
        imageURL: data.path
      })
    })
    .catch(err => console.error(err));
  }

  render() {
    const { session } = this.props;

    return (
      session ?
    //  (<View style={styles.container}>
    //    {this.state.objectUrl && <Image source={{ uri: this.state.objectUrl }} style={{width: 200, height: 200, resizeMode: 'contain'}} />}
    //    <Button title="Upload file" onPress={this.handleUploadFile.bind(this)} />
    //    <Button title="Call API" onPress={this.handleCallAPI.bind(this)} />
    //    <Text>Response: {this.state.apiResponse && this.handleResponse(this.state.apiResponse)}</Text>
    //    {/* <Button title="Sign Out" onPress={() => this.props.doSignOut()} /> */}
    //  </View>)
    (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles2.container}>
            {!this.state.showPreview && <Camera
              ref={(cam) => {
                this.camera = cam;
              }}
              style={styles2.preview}
              captureTarget={Camera.constants.CaptureTarget.disk}
              aspect={Camera.constants.Aspect.fill}>

              <Button style={styles2.capture} title="Capture" onPress={this.takePicture.bind(this)} />
            </Camera>}
            {this.state.showPreview &&  <Image
                source={{uri: this.state.imageURL, isStatic:true}}
                style={styles.canvas}
                />
              }
          </View>
        </View>
    )
     :
     (<View style={styles.container}>
       {/* <SignIn {...this.props} /> */}
       <AutoSignIn {...this.props} />
       {/* <SignUp {...this.props} /> */}
     </View>)
    );
  }
})));


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 20
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
    marginBottom: 200
  }
});
