import React from 'react';
import {
  Animated,
  StyleSheet,
  Dimensions,
  Easing
} from 'react-native';
import { colors, fonts, othersTheme } from '../../Utils/theme';
import TimerMixin from 'react-timer-mixin';

const {height, width} = Dimensions.get('window');
const animationTime = 400;

class AnimatedImageContainer extends React.Component {
  state = {
    topAnim: new Animated.Value(0),
    widthAnim: new Animated.Value(width),
    heightAnim: new Animated.Value(height - othersTheme.bottomBarHeight),
    borderAnim: new Animated.Value(othersTheme.margins),
    leftAnim: new Animated.Value(0),
  }

  animate() {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.topAnim, {
          toValue: height - 85,
          duration: animationTime,
          easing: Easing.cubic
        }),
        Animated.timing(this.state.widthAnim, {
          toValue: 50,
          duration: animationTime,
          easing: Easing.cubic
        }),
        Animated.timing(this.state.heightAnim, {
          toValue: 70,
          duration: animationTime,
          easing: Easing.cubic
        }),
        Animated.timing(this.state.borderAnim, {
          toValue: 5,
          duration: animationTime,
          easing: Easing.cubic
        }),
        Animated.timing(this.state.leftAnim, {
          toValue: 15,
          duration: animationTime,
          easing: Easing.cubic
        }),
      ]),
    ]).start();
  }

  componentDidMount() {
    TimerMixin.setTimeout(
      () =>
        this.animate(), 150
    );
  }

  render() {
    let {
      topAnim,
      leftAnim,
      widthAnim,
      heightAnim,
      borderAnim
     } = this.state;
    const allStyles = StyleSheet.flatten(
      [
        this.props.style,
        { top: topAnim },
        { left: leftAnim },
        { borderWidth: borderAnim },
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
