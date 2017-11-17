import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { WithAPI } from '../lib/Categories/API/Components';
import { WithAuth } from '../lib/Categories/Auth/Components';
import { WithStorage } from '../lib/Categories/Storage/Components';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { NavigationActions } from "react-navigation";
import { List, ListItem, ListView } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';

import { colors, fonts, othersTheme } from '../Utils/theme';
import TopBar from '../Components/QueueList/TopBar';
import { fetchStorage } from '../actions/storageActions';
import { savePhotoUrl } from '../actions/cameraActions';

const list = [
  {
    name: '#1',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  },
  {
    name: '#2',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    name: '#3',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    name: '#4',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    name: '#5',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    name: '#6',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    name: '#7',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    name: '#8',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  },
  {
    name: '#9',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    name: '#10',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    name: '#11',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    name: '#12',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    name: '#13',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    name: '#14',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
]


class QueueList extends React.Component {
  goBack = () => {
    this.props.navigation.goBack(null);
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <TopBar {...this.props} />

        <List
          containerStyle={styles.list}>
          {
            this.props.appData.storage.data.photos.map((l, i) => (
              <ListItem
                roundAvatar
                avatar={{uri:l.url}}
                key={i}
                title={`#${i+1}`}
              />
            ))
          }
        </List>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  list: {
    marginTop: 0,
    width: '100%',
    backgroundColor: colors.white,
    margin: 0,
    padding: 0,
  },
});


// export default QueueList;

function mapStateToProps (state) {
  return {
    appData: state.appData
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStorage,
  savePhotoUrl,
}, dispatch);

export default
  WithAuth(
    WithStorage(
      WithAPI(
        connect(mapStateToProps,mapDispatchToProps)(QueueList)
      )
    )
  );
