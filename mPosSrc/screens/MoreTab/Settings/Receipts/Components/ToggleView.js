import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { Images } from '@mPOS/assets';
import styles from '../Receipts.styles';
import { ms } from 'react-native-size-matters';
import { COLORS } from '@/theme';

export function ToggleView({ icon, title, subTitle, toggle, onPress, pending, buttonId }) {
  const handlePress = () => {
    onPress(buttonId); // Pass the buttonId back to the parent component
  };

  return (
    <View style={styles.itemContainer}>
      <View style={[styles.rowAligned, { flex: 1 }]}>
        <Image source={icon} style={styles.imageStyle} />
        <View style={{ marginLeft: ms(10), flex: 1 }}>
          <Text style={styles.titleText}>{title}</Text>
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
