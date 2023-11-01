import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import { COLORS } from '@/theme';

export function FullScreenLoader() {
  return (
    <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
      <ActivityIndicator color={COLORS.darkBlue} size="large" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
