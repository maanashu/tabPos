import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import { Images } from '@mPOS/assets';
import { ms } from 'react-native-size-matters';
import { COLORS, Fonts } from '@/theme';

export function ToggleView({
  icon,
  title,
  subHeading,
  subTitle,
  toggle,
  onPress,
  pending,
  buttonId,
  start,
  imageStyle,
}) {
  const handlePress = () => {
    onPress(buttonId); // Pass the buttonId back to the parent component
  };

  return (
    <View style={styles.itemContainer}>
      <View style={[styles.rowAligned, { flex: 1, alignItems: start ? 'flex-start' : 'center' }]}>
        <Image source={icon} style={[styles.imageStyle, imageStyle]} />
        <View style={{ marginLeft: ms(10), flex: 1 }}>
          <Text style={styles.titleText}>{title}</Text>
          {subHeading && <Text style={styles.subHeadingText}>{subHeading}</Text>}
          <Text style={styles.subTitleText}>{subTitle}</Text>
        </View>
      </View>

      {pending ? (
        <ActivityIndicator color={COLORS.primary} size={'small'} />
      ) : (
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={toggle ? Images.onToggle : Images.offToggle}
            resizeMode="contain"
            style={styles.toggleIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  rowJustified: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowAligned: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    height: ms(32),
    width: ms(32),
    // tintColor: COLORS.darkGray,
  },
  toggleIcon: {
    height: ms(24),
    width: ms(24),
  },
  titleText: {
    color: COLORS.solid_grey,
    fontSize: ms(14),
    fontFamily: Fonts.SemiBold,
  },
  subTitleText: {
    color: COLORS.dark_grey,
    fontSize: ms(11),
    fontFamily: Fonts.Regular,
  },
  subHeadingText: {
    color: COLORS.solid_grey,
    fontSize: ms(11),
    fontFamily: Fonts.SemiBold,
    marginVertical: ms(2),
  },
  itemContainer: {
    borderWidth: 1,
    paddingHorizontal: ms(10),
    paddingVertical: ms(10),
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: ms(5),
    marginVertical: ms(5),
    borderColor: COLORS.solidGrey,
  },
});
