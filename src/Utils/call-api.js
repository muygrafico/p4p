

import RNFetchBlob from 'react-native-fetch-blob';

export default {
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
  },
};
