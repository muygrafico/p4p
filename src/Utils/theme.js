import { calculatePercentage } from  './index';

const colors = {
  white: '#FBF7F4',
  black: '#282828',
};

const fonts = {
  main: 'Helvetica',
};

let othersTheme = {
  aspectRatio: '2:3',
  margins: 15,
  thumbWidth: 50,
  thumbYOffset: 35,
  animationDuration: 350
};

othersTheme.marginsx2 = othersTheme.margins * 2;

export {
  colors,
  fonts,
  othersTheme
};
