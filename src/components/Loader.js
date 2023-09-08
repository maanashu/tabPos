import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS, SF, SH, ShadowStyles, SW, TextStyles } from '@/theme';

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
});

export function Loader({ message }) {
  return (
    <View style={styles.imageOverlay}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: COLORS.primary,
        }}
      >
        {message || 'Loading data ...'}
      </Text>
    </View>
  );
}

Loader.propTypes = {
  message: PropTypes.string.isRequired,
};
