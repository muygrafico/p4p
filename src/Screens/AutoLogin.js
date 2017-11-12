import React from 'react';
import {
  View,
} from 'react-native';

import { AutoSignIn } from '../../lib/Categories/Auth/Components/Examples';


class AutoLogin extends React.Component {

  render() {
    return (
      (<View style={styles.appContainer}>
        <AutoSignIn {...this.props} />
      </View>)
    );
  }
};

const styles = StyleSheet.create({
});

export default AutoLogin;
