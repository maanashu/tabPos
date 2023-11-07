import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Spacer } from '@/components';
import { ms } from 'react-native-size-matters';
import { COLORS, Fonts } from '@/theme';

export function SettingsContainer({ heading, subHeading, children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headingTitle}>{heading}</Text>
      <Spacer space={ms(16)} />
      <Text style={styles.subHeadingTitle}>{subHeading}</Text>
      <Spacer space={ms(10)} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(16),
    paddingVertical: ms(30),
    backgroundColor: COLORS.white,
    borderRadius: ms(10),
    flex: 1,
  },
  headingTitle: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.black,
    fontSize: ms(16),
  },
  subHeadingTitle: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: ms(14),
  },
});
