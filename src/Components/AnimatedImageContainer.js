import React from 'react';
import {
  Animated,
  StyleSheet,
  Dimensions,
  Easing
} from 'react-native';

const {height, width} = Dimensions.get('window');


class AnimatedImageContainer extends React.Component {
  state = {
    topAnim: new Animated.Value(0),  // Initial value for opacity: 0
    widthAnim: new Animated.Value(width),  // Initial value for opacity: 0
    heightAnim: new Animated.Value(height - 100),  // Initial value for opacity: 0
    borderAnim: new Animated.Value(15),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.topAnim, {
          toValue: height - 85,
          duration: 350,
          easing: Easing.cubic
        }),
        Animated.timing(this.state.widthAnim, {
          toValue: 50,
          duration: 350,
          easing: Easing.cubic
        }),
        Animated.timing(this.state.heightAnim, {
          toValue: 70,
          duration: 350,
          easing: Easing.cubic
        }),
        Animated.timing(this.state.borderAnim, {
          toValue: 3,
          duration: 350,
          easing: Easing.cubic
        }),
      ]),
    ]).start();
  }

  render() {
    let { topAnim, widthAnim, heightAnim, borderAnim } = this.state;
    const allStyles = StyleSheet.flatten(
      [
        this.props.style,
        { top: topAnim },
        { height: heightAnim },
        { borderWidth: borderAnim },
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
