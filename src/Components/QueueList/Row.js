import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors } from '../../Utils/theme';

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.black,
    height: 'auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center'
  },
  rowImage: {
    width: 80,
    height: 60,
  },
  counter: {
    fontWeight: '600',
    color: colors.white,
  },
  status: {
    fontWeight: '600',
    color: colors.white,
  },
  date: {
    fontSize: 13
  },
  rightRow: {
    marginLeft: 15,
  }
});

function _calculateIndex(i) {
  return length - i
}

const Row = ({item, index, count}) => (
  <View style={styles.row} key={this._keyExtractor}>
    <Image
      source={{uri: item.url}}
      style={styles.rowImage}
    />
    <View style={styles.rightRow}>
      <Text style={styles.counter}>#{count}</Text>
      <Text style={styles.status}>Tap to share</Text>
    </View>
  </View>
);

export default Row;
