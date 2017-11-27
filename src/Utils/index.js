import { othersTheme } from './theme';

export const calculatePercentage = function(width, expectedWidth) {
    return (((expectedWidth*100)/width) * 0.01)
};

export const calculateDimensions = function(width, height) {
  let d = {};
  let { margins, marginsx2, thumbWidth, animationDuration } = othersTheme;

  const targetScalePercentage = calculatePercentage(width, thumbWidth);
  const previewHeight = Math.ceil((width/2) * 3);
  const bottomBarHeight = (height - previewHeight) + marginsx2;
  const thumbBorderWidth = Math.ceil(margins * targetScalePercentage);
  const thumbHeight = (previewHeight * targetScalePercentage) - (thumbBorderWidth * 2);
  const bottomBarMargin = ((bottomBarHeight - thumbHeight) / 2);

  d.targetScalePercentage = targetScalePercentage;
  d.previewHeight = previewHeight;
  d.bottomBarHeight = bottomBarHeight;
  d.bottomBarMargin = bottomBarMargin;
  d.thumbBorderWidth = thumbBorderWidth;
  d.thumbHeight = thumbHeight;
  d.margins = margins;
  d.marginsx2 = marginsx2;
  d.thumbWidth = thumbWidth;
  d.animationDuration = animationDuration;

  return d;
};
