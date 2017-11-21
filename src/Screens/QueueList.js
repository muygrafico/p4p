import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { WithAPI } from '../lib/Categories/API/Components';
import { WithAuth } from '../lib/Categories/Auth/Components';
import { WithStorage } from '../lib/Categories/Storage/Components';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SectionList,
  FlatList,
  Image
} from 'react-native';
import { NavigationActions } from "react-navigation";
import { List, ListItem, ListView } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';

import { colors, fonts, othersTheme } from '../Utils/theme';
import TopBar from '../Components/QueueList/TopBar';
import Row from '../Components/QueueList/Row';
import { fetchStorage } from '../actions/storageActions';
import { savePhotoUrl } from '../actions/cameraActions';
import _ from 'lodash';

class QueueList extends React.Component {
  // goBack = () => {
  //   this.props.navigation.goBack(null);
  // }

  componentDidReceiveProps() {
    this.props.fetchStorage('app-data');
  }

  _renderItem = ({item, index}) => (
    <Row
      item={item}
      index={index}
      count={this._calculateIndex(index)}
    />
  );

  _keyExtractor = (item, index) => index;

  data(data) {
    return _.reverse(data)
  }

  _calculateIndex(i) {
    return this.props.photos.length - i
  }

  render() {

    return(
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <TopBar
          count={this.props.photos.length}
          {...this.props}
        />
        <FlatList
          style={styles.flatList}
          data={_.reverse(this.props.photos)}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.black,
    alignItems: 'center',
  },
  flatList: {
    width: '100%'
  },
});

function mapStateToProps (state) {
  return {
    appData: state.appData,
    photos: state.appData.storage.data.photos
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStorage,
  savePhotoUrl,
}, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(QueueList);
