import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { WithAPI } from './lib/Categories/API/Components';
import { WithAuth } from './lib/Categories/Auth/Components';
import { WithStorage } from './lib/Categories/Storage/Components';

import { SignIn, SignUp } from './lib/Categories/Auth/Components/Examples';
import awsmobile from './aws-exports';


export default WithStorage(WithAPI(WithAuth(class App extends React.Component {

  state = {
    objectUrl: null,
    apiResponse: null
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

  render() {
    const { session } = this.props;

    return (
      session ?
     (<View style={styles.container}>
       <Button title="Call API" onPress={this.handleCallAPI.bind(this)} />
       <Text>Response: {this.state.apiResponse && this.handleResponse(this.state.apiResponse)}</Text>
       <Button title="Sign Out" onPress={() => this.props.doSignOut()} />
     </View>)
     :
     (<View style={styles.container}>
       <SignIn {...this.props} />
       <SignUp {...this.props} />
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
  },
});
