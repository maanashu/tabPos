import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '@/theme';
import { ms } from 'react-native-size-matters';

export function HorizontalLine({ style }) {
  return <View style={[styles.lineStyle, style]} />;
}
const styles = StyleSheet.create({
  lineStyle: {
    height: 1,
    backgroundColor: COLORS.solidGrey,
    marginTop: ms(10),
  },
});
