import { Fonts, cross } from '@/assets';
import { Button } from '@/components';
import { COLORS, SH, SW } from '@/theme';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { ms } from 'react-native-size-matters';

const CalendarPickerModal = ({ onPress, onDateChange, handleOnPressNext, onSelectedDate }) => {
  const minDate = new Date(2020, 1, 1); // Today
  const maxDate = new Date(2030, 6, 3);

  return (
    <View style={styles.container}>
      <View style={styles.flexAlign}>
        {/* <Text style={styles.headerText}>{'Filter'}</Text> */}
        <TouchableOpacity style={styles.imageView} onPress={onPress}>
          <Image source={cross} style={styles.headerImage} />
        </TouchableOpacity>
      </View>
      <CalendarPicker
        startFromMonday={true}
        allowRangeSelection={true}
        minDate={minDate}
        maxDate={maxDate}
        todayBackgroundColor="#f2e6ff"
        selectedDayColor={COLORS.primary}
        selectedDayTextColor="#FFFFFF"
        onDateChange={onDateChange}
        onPressNext={handleOnPressNext}
        headerWrapperStyle={styles.headerWrapper}
        textStyle={{ fontSize: ms(12) }}
        width={ms(400)}
        height={ms(400)}
      />
      <View style={styles.flexDirectionRow}>
        <Button
          onPress={onPress}
          style={styles.cancelButton}
          title={'Cancel'}
          textStyle={styles.cancelText}
        />
        <Button
          style={styles.applyButton}
          title={'Apply'}
          textStyle={styles.applyText}
          onPress={onSelectedDate}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  flexAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: ms(5),
  },
  imageView: {
    backgroundColor: COLORS.textInputBackground,
    padding: SW(4),
  },
  headerImage: {
    tintColor: COLORS.primary,
    height: SH(18),
    width: SW(7),
    resizeMode: 'contain',
  },
  flexDirectionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerWrapper: {
    width: ms(400),
    height: ms(60),
  },
  cancelText: {
    color: COLORS.darkGray,
    fontSize: ms(11),
    fontFamily: Fonts.Regular,
  },
  cancelButton: {
    backgroundColor: COLORS.textInputBackground,
    height: ms(30),
    width: '40%',
    marginTop: ms(10),
    color: COLORS.black,
    marginHorizontal: ms(5),
    fontFamily: Fonts.Regular,
  },
  applyText: {
    color: COLORS.white,
    fontSize: ms(11),
    fontFamily: Fonts.Regular,
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    height: ms(30),
    width: '40%',
    marginTop: ms(10),
    color: COLORS.white,
    fontFamily: Fonts.Regular,
  },
});

export default CalendarPickerModal;
