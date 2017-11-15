import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import MFAPrompt from '../lib/Categories/Auth/Components/MFAPrompt';
import { NavigationActions } from "react-navigation";
import TimerMixin from 'react-timer-mixin';

import { WithAPI } from '../lib/Categories/API/Components';
import { WithAuth } from '../lib/Categories/Auth/Components';
import { WithStorage } from '../lib/Categories/Storage/Components';
import { fetchStorage } from '../actions/storageActions';

class AutoSignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'guest',
      password: 'guest1234',
      isLoggedIn: null,
      errorMessage: null,
    };

    this.resolver = Promise.resolve();

    this.handleSignIn = this.handleSignIn.bind(this);
    this.doSignIn = this.doSignIn.bind(this);

    this.handleMFAValidate = this.handleMFAValidate.bind(this);
    this.handleMFACancel = this.handleMFACancel.bind(this);
    this.handleMFASuccess = this.handleMFASuccess.bind(this);
  }

  navigate = () => {
      const navigateToHome = NavigationActions.navigate({
        routeName:'Home',
        params:{name:'Home'}
      });

      TimerMixin.setTimeout(
        () =>
          this.props.navigation.dispatch(navigateToHome), 1000
      );
  }

  /**
   * Signs in a user with a username.password combination. If needed, takes care of MFA.
   *
   * @param {string} username
   * @param {string} password
   */
  doSignIn(username, password) {
    const { auth } = this.props;
    let showMFAPrompt = false;

    return new Promise(async (outResolve, reject) => {
      this.resolver = outResolve;

      const session = await new Promise((resolve) => {
        auth.handleSignIn(username, password, auth.loginCallbackFactory({
          onSuccess(session) {
            console.log('loginCallbacks.onSuccess', session);
            resolve(session);
            this.navigate();
          },
          onFailure(err) {
            console.log('loginCallbacks.onFailure', err);
            reject(new Error(err.invalidCredentialsMessage || err.message || err));
          },
          newPasswordRequired(data) {
            reject(new Error('newPasswordRequired'));
          },
          mfaRequired(challengeName, challengeParameters) {
            showMFAPrompt = true;
            resolve();
          },
        }, this));
      });

      this.setState({ showMFAPrompt }, () => {
        if (session) {
          this.resolver(session);
        }
      });
    });
  }

  async handleSignIn() {
    const { username, password } = this.state;

    try {
      const session = await this.doSignIn(username, password);
      this.props.onSignIn(session);

      console.log('CLIENT', 'Signed In: ' + (session ? 'YES' : 'NO'));
    } catch (err) {
      console.log('CLIENT', err.message);
      this.setState({ errorMessage: err.message });
      this.handleSignIn();
    }
  }

  handleMFAValidate(code = '') {
    const { auth } = this.props;

    return new Promise((resolve, reject) =>
      auth.sendMFAVerificationCode(code, { onFailure: reject, onSuccess: resolve }, this));
  }

  handleMFACancel() {
    this.setState({ showMFAPrompt: false });
    this.resolver(null);
  }

  handleMFASuccess(session) {
    this.resolver(session);
    this.setState({ showMFAPrompt: false });
  }

  // componentDidMount() {
  //   this.handleSignIn();
  // }

  componentDidMount() {
    // this.props.fetchStorage('app-data');
    // console.log(this.props.appData);
    // this.setState({isLoggedIn: })
  }

  render() {
    return (
      <View {...this.props} style={[styles.container, this.props.style]}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.loadingImg}
            source={require('../img/loading.gif')}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fieldsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 20,
    marginBottom: 20,
  },
  imgContainer:{
    width:10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  loadingImg: {
    width: 155,
    height: 155,
    margin:0,
  },
});

function mapStateToProps (state) {
  return {
    appData: state.appData
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStorage,
}, dispatch);

export default
  WithStorage(
    WithAPI(
      WithAuth(
        connect(
          mapStateToProps,mapDispatchToProps
        )(AutoSignIn)
      )
    )
  );
