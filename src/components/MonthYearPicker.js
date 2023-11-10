import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Fonts } from '@/assets';
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS, SF, SW } from '@/theme';
import moment from 'moment';

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
    width: SW(120),
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
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
    color: COLORS.gerySkies,
  },
  selectedTextStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.SemiBold,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  itemTextStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
});
