import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { calendar, Fonts } from '@/assets';
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS, SF, SW } from '@/theme';
import moment from 'moment';
import { isTablet } from 'react-native-device-info';
import { ms } from 'react-native-size-matters';

export const DATE_TYPE = {
  MONTH: 'MONTH',
  YEAR: 'YEAR',
};

const MonthYearPicker = ({
  placeholder,
  containerStyle,
  dropdownStyle,
  dateType,
  onSelect,
  defaultValue = null,
  defaultYear = null,
  showAllMonths = false,
}) => {
  const currentYear = moment().year();
  const years = Array.from({ length: 10 }, (_, index) => currentYear + index);
  const yearsData = years.map((year) => ({ label: year.toString(), value: year }));

  const monthsData = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
  ];

  if (dateType === DATE_TYPE.MONTH && defaultYear === currentYear) {
    const currentMonth = moment().month() + 1;
    if (showAllMonths) {
      monthsData.splice(currentMonth, monthsData.length - currentMonth);
    } else {
      monthsData.splice(0, currentMonth - 1);
    }
  }

  const [value, setValue] = useState(defaultValue);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={containerStyle}>
      <Dropdown
        style={[styles.dropdown, dropdownStyle, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        iconStyle={styles.iconStyle}
        data={dateType === DATE_TYPE.YEAR ? yearsData : monthsData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder ?? 'Select Item'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onSelect(item);
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => {
          return <Image source={calendar} style={styles.calendarStyle} />;
        }}
      />
    </View>
  );
};

export default MonthYearPicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    width: isTablet() ? SW(50) : SW(130),
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: ms(12),
    paddingHorizontal: 8,
    borderColor: COLORS.navy_blue,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    color: COLORS.navy_blue,
  },
  selectedTextStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.SemiBold,
    color: COLORS.navy_blue,
  },
  iconStyle: {
    width: 25,
    height: 25,
    tintColor: COLORS.navy_blue,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  itemTextStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    color: COLORS.navy_blue,
  },
  calendarStyle: {
    width: ms(12),
    height: ms(12),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
    marginHorizontal: ms(3),
  },
});
