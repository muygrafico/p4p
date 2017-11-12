import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationActions } from "react-navigation";
// export default () => <View style={styles.container}><Text>Queue List Page</Text></View>;

class QueueList extends React.Component {
  navigate = () => {
      const navigateToHome = NavigationActions.navigate({
        routeName:'Home',
        params:{name:'Shubhnik'}
      });

      this.props.navigation.dispatch(navigateToHome);
  }
  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.navigate}
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
