import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const customStyles = (colors) =>
  StyleSheet.create({
    indicatorProps: {
      size: 30,
      borderWidth: 0,
      color: 'rgba(150, 150, 150, 1)',
      unfilledColor: 'rgba(200, 200, 200, 0.2)',
    },
  });
const Image = createImageProgress(FastImage);

export function ImageView({ style, imageStyle, imageUrl }) {
  const { colors } = useTheme();
  const styles = useMemo(() => customStyles(colors), [colors]);

  return (
    <Image
      accessibilityIgnoresInvertColors
      source={
        typeof imageUrl === 'string'
          ? {
              uri: imageUrl,
            }
          : imageUrl
      }
      indicator={Progress.Pie}
      indicatorProps={styles.indicatorProps}
      style={style}
      imageStyle={imageStyle}
    />
  );
}

ImageView.propTypes = {
  style: PropTypes.object,
  imageStyle: PropTypes.object,
  imageUrl: PropTypes.string.isRequired,
};

ImageView.defaultProps = {
  style: null,
  imageStyle: null,
  imageUrl: null,
};
