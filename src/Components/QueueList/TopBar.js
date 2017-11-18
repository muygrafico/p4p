import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationActions } from "react-navigation";
import Icon from 'react-native-vector-icons/EvilIcons';

import { colors, fonts, othersTheme } from '../../Utils/theme';

class TopBar extends React.Component {
  goBack = () => {
    this.props.navigation.goBack(null);
  }

  render() {
    return(
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.buttons}
          onPress={this.goBack}
        >
          <Icon name="close" size={30} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Print Queue ({this.props.count})</Text>
        <TouchableOpacity
          style={styles.buttons}
        >
          <Icon name="gear" size={30} color={colors.white} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: colors.black,
    height: 80,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.main,
    fontSize: 18
  },
  buttons: {
    padding: 7,
    paddingLeft: 20,
    paddingRight: 20,
  }
});

export default TopBar;
