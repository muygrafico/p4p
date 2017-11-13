import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationActions } from "react-navigation";
// export default () => <View style={styles.container}><Text>Queue List Page</Text></View>;


class QueueList extends React.Component {
  goBack = () => {
    this.props.navigation.goBack(null);
  }

  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.goBack}
        >
          <Text>Navigate to screen2</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});


export default QueueList;
