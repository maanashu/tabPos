import { Fonts, cross } from '@/assets';
import { Button } from '@/components';
import { COLORS, SH, SW } from '@/theme';
import moment from 'moment';
import React, { useState } from 'react';
import { useMemo, memo } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { ms } from 'react-native-size-matters';

const CalendarPickerModal = ({
  onPress,
  onDateChange = () => {},
  handleOnPressNext = () => {},
  onSelectedDate = () => {},
  allowRangeSelection,
  maxDate,
  selectedStartDate,
  onCancelPress = () => {},
}) => {
  const minDate = useMemo(() => new Date(2020, 1, 1), []);
  const [selectedDate, setSelectDate] = useState(moment());
  return (
    <View style={styles.container}>
      <View style={styles.flexAlign}>
        {/* <Text style={styles.headerText}>{'Filter'}</Text> */}
        <TouchableOpacity style={styles.imageView} onPress={onPress}>
          <Image source={cross} style={styles.headerImage} />
        </TouchableOpacity>
      </View>
      <CalendarPicker
        selectedStartDate={selectedStartDate}
        startFromMonday={true}
        allowRangeSelection={allowRangeSelection}
        minDate={minDate}
        maxDate={maxDate}
        todayBackgroundColor="white"
        todayTextStyle={'black'}
        selectedDayColor={COLORS.primary}
        selectedDayTextColor="#FFFFFF"
        onDateChange={(date, type) => {
          onDateChange(date, type);
          setSelectDate(date);
        }}
        onPressNext={handleOnPressNext}
        headerWrapperStyle={styles.headerWrapper}
        textStyle={{ fontSize: ms(12) }}
        width={ms(400)}
        height={ms(400)}
        scaleFactor={470}
      />
      <View style={styles.flexDirectionRow}>
        <Button
          onPress={onCancelPress}
          style={styles.cancelButton}
          title={'Cancel'}
          textStyle={styles.cancelText}
        />
        <Button
          style={styles.applyButton}
          title={'Apply'}
          textStyle={styles.applyText}
          onPress={() => {
            onSelectedDate(selectedDate);
          }}
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
    position: 'absolute',
    bottom: ms(15),
    right: 0,
    left: 0,
  },
  headerWrapper: {
    width: ms(400),
    height: Platform.OS === 'ios' ? ms(50) : ms(60),
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

export default memo(CalendarPickerModal);
