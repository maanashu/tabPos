import React, { useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { Images } from '@mPOS/assets';
import { COLORS, SH, SW } from '@/theme';
import { goBack } from '@mPOS/navigation/NavigationRef';

export function BackIcon({ style, imgStyle }) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        imageStyle: {
          width: SH(20),
          height: SH(30),
          position: 'absolute',
          resizeMode: 'contain',
        },
        touchStyle: {
          width: SW(40),
          height: SH(20),
          alignItems: 'center',
          justifyContent: 'center',
        },
      }),
    [style, imgStyle]
  );
  return (
    <TouchableOpacity
      hitSlop={{ top: 16, left: 16, right: 16, bottom: 16 }}
      onPress={() => goBack()}
      style={[styles.touchStyle, style]}
    >
      <Image
        source={Images.backArrow}
        style={[styles.imageStyle, { ...imgStyle }, { tintColor: COLORS.black }]}
      />
    </TouchableOpacity>
  );
}
