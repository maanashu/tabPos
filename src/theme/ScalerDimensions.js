import { Dimensions } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const height = Dimensions.get('window').height;
export const width = Dimensions.get('window').width;
/**
 * Width-Percentage
 * Converts width dimension to percentage
 * 375, 812 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */

export const SW = (dimension) => {
  return wp((dimension / 375) * 100 + '%');
};

//  * * 375, 812 - design were made using this scale
//  * @param dimension directly taken from design wireframes
//  * @returns {string} percentage string e.g. '25%'
//  */
export const SH = (dimension) => {
  return hp((dimension / 812) * 100 + '%');
};

export const SF = (dimension) => {
  // return wp((dimension / width) * 100 + '%');
  //return hp((dimension / height) * 100 + '%');
  return hp((dimension / 812) * 100 + '%');
};

// * * Below methods are directly use percentage
// * from screen height & width
// */

export const heightPercent = (percent) => {
  return hp(percent);
};

export const widthPercent = (percent) => {
  return wp(percent);
};

export const fontPercent = (percent) => {
  return hp(percent);
};

export const padding_eight = 8;
export const padding_sixteen = 16;
