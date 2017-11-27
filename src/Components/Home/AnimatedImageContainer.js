import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View,
} from 'react-native';
import { colors, fonts, othersTheme } from '../../Utils/theme';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  startPictureAnimation,
  onPictureAnimation,
  endPictureAnimation,
 } from '../../actions/cameraActions';
import TimerMixin from 'react-timer-mixin';

import { calculatePercentage, calculateDimensions } from  '../../Utils';

const {height, width} = Dimensions.get('window');

const calculatedDimensions = calculateDimensions(width, height);
const {
  targetScalePercentage,
  previewHeight,
  bottomBarHeight,
  borderWidth,
  thumbHeight,
  bottomBarMargin,
  animationDuration
} = calculatedDimensions;

class Child extends React.Component {

  state = {
    hidden: ''
  }

  componentWillMount () {

    setTimeout(() => {
      this.show();
    }, this.props.wait);
  }

  show () {
    this.setState({hidden : ""});
  }

  render () {
    return (
      <View style={this.state.hidden}>
        {this.props.children}
      </View>
    )
  }
};

class AnimatedImageContainer extends React.Component {
  state = {
    valueScale: new Animated.Value(0),
    valueTranslateX: new Animated.Value(0),
    valueTranslateY: new Animated.Value(0),
  }

  animate() {
    Animated.parallel([
      Animated.timing(this.state.valueTranslateY, { toValue: 1, easing: Easing.quad, duration: animationDuration, useNativeDriver: true }),
      Animated.timing(this.state.valueTranslateX, { toValue: 1, easing: Easing.quad, duration: animationDuration, useNativeDriver: true }),
      Animated.timing(this.state.valueScale, { toValue: 1, easing: Easing.quad, duration: animationDuration, useNativeDriver: true }),
    ])
    .start(
      (event) => {
        if (event.finished) {
          this.props.fetchStorage('app-data');
          TimerMixin.setTimeout(
            () => this.props.endPictureAnimation(), 1
          );
        }
      }
    )
  }

  componentDidMount() {
    TimerMixin.setTimeout(
      () => this.animate(), animationDuration
    );
  }

  render() {
    let {
      valueScale,
      valueTranslateX,
      valueTranslateY
     } = this.state;

    let { margins, marginsx2, thumbYOffset, thumbWidth } = othersTheme;

    let targetTranslateX =
      -((width/2) - (width * targetScalePercentage / 2) - margins);

    let targetTranslateY =
      ((height/2) - (thumbHeight / 2) + thumbYOffset);


    let scale = valueScale.interpolate({
      inputRange: [0, 1],
      outputRange: [ 1, targetScalePercentage],
      extrapolate: 'clamp'
    });

    let translateX = valueTranslateX.interpolate({
      inputRange: [0, 1],
      outputRange: [0 , targetTranslateX],
      extrapolate: 'clamp'
    });

    let translateY= valueTranslateY.interpolate({
      inputRange: [0, 1],
      outputRange: [ 0, targetTranslateY],
      extrapolate: 'clamp'
    });

    const scaleStyles = StyleSheet.flatten(
      [
        {transform: [
          { scale },
        ]}
      ])

    const positionStyles = StyleSheet.flatten(
      [
        this.props.style,
        {transform: [
          { translateY },
          { translateX },
        ]}
      ])

    return (
      <Animated.View style={positionStyles}>
        <Animated.View
          style={scaleStyles}
          >
            {this.props.children}
        </Animated.View>
      </Animated.View>
    );
  }
}

function mapStateToProps (state) {
  return {}
}

const mapDispatchToProps = dispatch => bindActionCreators({
  startPictureAnimation,
  onPictureAnimation,
  endPictureAnimation,
}, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(AnimatedImageContainer);
