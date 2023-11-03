import { COLORS } from '@/theme';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ms } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  leftMainViewStyle: {
    flex: 0.75,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  rowStyle: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(7),
    paddingHorizontal: ms(2),
  },
});

export default styles;
