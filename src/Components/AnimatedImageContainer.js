import React from 'react';
import {
  Animated,
  StyleSheet,
  Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');


class AnimatedImageContainer extends React.Component {
  state = {
    topAnim: new Animated.Value(0),  // Initial value for opacity: 0
    widthAnim: new Animated.Value(width),  // Initial value for opacity: 0
    heightAnim: new Animated.Value(height - 100),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.topAnim, {
          toValue: height - 80,
          duration: 1500,
        }),
        Animated.timing(this.state.widthAnim, {
          toValue: 80,
          duration: 1500,
        }),
        Animated.timing(this.state.heightAnim, {
          toValue: 80,
          duration: 1500,
        }),
      ]),
    ]).start();
  }

  render() {
    let { topAnim, widthAnim, heightAnim } = this.state;
    const allStyles = StyleSheet.flatten(
      [
        this.props.style,
        { top: topAnim },
        { height: heightAnim },
        { width: widthAnim }
      ])

    return (
      <Animated.View
        style={allStyles}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default AnimatedImageContainer;
