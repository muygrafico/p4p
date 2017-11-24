import React from 'react';
import {
  Animated,
  StyleSheet,
  Dimensions,
  Easing
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

const {height, width} = Dimensions.get('window');

class AnimatedImageContainer extends React.Component {
  state = {
    valueScale: new Animated.Value(0),
    valueTranslateX: new Animated.Value(0),
    valueTranslateY: new Animated.Value(0),
  }

  animate() {
    // Animated.timing(this.state.valueScale, {
    //   toValue: 1, duration: 500, useNativeDriver: true
    // })
    Animated.parallel([
      Animated.timing(this.state.valueTranslateY, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(this.state.valueTranslateX, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(this.state.valueScale, { toValue: 1, duration: 500, useNativeDriver: true }),
    ])
    .start(
      (event) => {
        if (event.finished) {
          TimerMixin.setTimeout(
            () =>
              this.props.endPictureAnimation(), 150
          );
        }
      }
    )
  }

  componentDidMount() {
    TimerMixin.setTimeout(
      () => this.animate(), 1000
    );
  }

  calculatePercentage(width, expectedWidth) {
    return (((expectedWidth*100)/width) * 0.01)
  }

  render() {
    let {
      valueScale,
      valueTranslateX,
      valueTranslateY
     } = this.state;

    let {bottomBarHeight , margins, thumbYOffset, thumbWidth } = othersTheme;
    let targetScalePercentage = this.calculatePercentage(width, thumbWidth);
    let previewHeight = height - bottomBarHeight;
    let thumbHeight = previewHeight * targetScalePercentage;
    let bottomBarMargin = ((bottomBarHeight - thumbHeight) / 2);
    // let targetTranslateX = -((width/4) + (15 * 2));
    let targetTranslateX =
      -((width/2) - (width * targetScalePercentage / 2) - margins);

    let targetTranslateY =
      ((height/2) - (thumbHeight / 2) + thumbYOffset);
    // ((height / 2) - (height * targetScalePercentage / 2) + (othersTheme.marginsx2 + 10));
    // (height - (height / 2)) - (height * targetScalePercentage / 2) - thumbYOffset




    console.log(
      `

      targetScalePercentage: ${targetScalePercentage},
      bottomBarHeight: ${bottomBarHeight},
      margins: ${margins},
      thumbYOffset: ${thumbYOffset},
      thumbHeight: ${thumbHeight},
      bottomBarMargin: ${bottomBarMargin},
      width: ${width},
      height: ${height},
      targetScalePercentage: ${targetScalePercentage},
      targetTranslateX: ${targetTranslateX},
      targetTranslateY: ${targetTranslateY}`
    );

    let scale = valueScale.interpolate({
      inputRange: [0, 1],
      outputRange: [ 1, targetScalePercentage],
      extrapolate: 'clamp'
    });

    let translateX = valueTranslateX.interpolate({
      inputRange: [0, 1],
      // outputRange: [ 0, targetTranslateX],
      outputRange: [0 , targetTranslateX],
      extrapolate: 'clamp'
    });

    let translateY= valueTranslateY.interpolate({
      inputRange: [0, 1],
      outputRange: [ 0, targetTranslateY],
      extrapolate: 'clamp'
    });

    // const position= {
    //   transform: [
    //     {
    //       translateX: this.animatedValue.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: [0 - (width / 2) - (width * initialScale / 2), 15]
    //       })
    //     },
    //     {
    //       translateY: this.animatedValue.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: [0 - (height / 2) - (height * initialScale / 2), height - 30]
    //       })
    //     }
    //   ]
    // };

    const scaleStyles = StyleSheet.flatten(
      [
        // this.props.style,
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
