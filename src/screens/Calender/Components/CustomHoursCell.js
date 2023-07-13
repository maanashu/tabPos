import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '@/theme';
import { Fonts } from '@/assets';
import { ms } from 'react-native-size-matters';

const CustomHoursCell = formattedHours => {
  const [hours, ampm] = formattedHours.split(' ');
  return (
    <View style={styles.hourContainer}>
      <Text style={styles.timeText}>
        {hours + `${hours !== '' ? '.00' : ''}`}
      </Text>
      <Text style={styles.ampmText}>{ampm}</Text>
    </View>
  );
};

export default CustomHoursCell;

const styles = StyleSheet.create({
  hourContainer: {
    alignItems: 'center',
    marginTop: -5,
    backgroundColor: COLORS.textInputBackground,
    height: '100%',
  },

  timeText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(6),
    color: COLORS.darkGray,
  },
  ampmText: {
    fontFamily: Fonts.Regular,
    fontSize: ms(4),
    color: COLORS.darkGray,
  },
});
