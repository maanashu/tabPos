import React from 'react';

import { View, ActivityIndicator } from 'react-native';

import { COLORS, SW } from '@/theme';
import PropTypes from 'prop-types';
import { ms } from 'react-native-size-matters';

export function ListLoadscroll({ size }) {
  return (
    <View style={{ marginTop: ms(50) }}>
      <ActivityIndicator size={size ? size : 'small'} color={COLORS.darkBlue} />
    </View>
  );
}
