import { othersTheme } from './theme';
import RNFetchBlob from 'react-native-fetch-blob';
import { Buffer } from 'buffer';

export const readFile  =  (urlLocal) => new Promise((resolve) => {
  let data = '';

  RNFetchBlob.fs.readStream(urlLocal, 'base64', 4095)
  .then((ifstream) => {
    ifstream.open()
    ifstream.onData((chunk) => {
      data += chunk
    })
    ifstream.onError((err) => {
      console.log('oops', err)
    })
    ifstream.onEnd(() => {
      resolve(data)
    })
  })
})

export const handleUploadFile  =  async (urlLocal, IdentityId, storage) => {
  const url = urlLocal;
  const [, fileName, extension] = /.*\/(.+)\.(\w+)$/.exec(url);
  const key = `private/${IdentityId}/${fileName}`;
  let objectUrl = null;

  try {
    const data = await readFile(urlLocal);
    const upload = await storage.putObject(key, new Buffer(data, 'base64'), 'image/jpeg');
  } catch (err) {
    console.warn(`handleUploadFile: ${err}`);
  }
}

// Utility used at calculateDimensions, line 55

export const calculatePercentage = function(screenWidth, expectedWidth) {
    return (((expectedWidth*100)/screenWidth) * 0.01)
};

// Utility for calculating all final dimensions and percetanges of thumbnail
// animation using transform translate and scale ir to make usable useNativeDriver
// at AnimatedImageContainer component

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
