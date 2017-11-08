export default {
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
};
