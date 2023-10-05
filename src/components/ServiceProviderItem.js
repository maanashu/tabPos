import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS } from '@/theme';
import { ms } from 'react-native-size-matters';
import { userImage } from '@/assets';

export const ServiceProviderItem = ({ item, onPress, borderColor, containerStyle, imageStyle }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.imageSelectedBorder, containerStyle, { borderColor }]}
  >
    <Image
      source={
        item?.user?.user_profiles?.profile_photo
          ? { uri: item?.user?.user_profiles?.profile_photo }
          : userImage
      }
      style={[styles.imageStyl, imageStyle]}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  imageSelectedBorder: {
    borderWidth: 5,
    marginHorizontal: ms(5),
    borderRadius: 100,
    borderColor: COLORS.primary,
  },
  imageStyl: {
    width: ms(45),
    height: ms(45),
    resizeMode: 'contain',
    borderRadius: ms(22.5),
  },
});
