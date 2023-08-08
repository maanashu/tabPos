import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Fonts } from '@/assets';
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS, SF, SW } from '@/theme';

export const DATE_TYPE = {
  MONTH: 'MONTH',
  YEAR: 'YEAR',
};

const MonthYearPicker = ({ placeholder, containerStyle, dateType }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear + index);

  const yearsData = years.map((year) => ({ label: year.toString(), value: year }));
  const monthsData = [
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' },
  ];

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={containerStyle}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        iconStyle={styles.iconStyle}
        data={dateType === DATE_TYPE.YEAR ? yearsData : monthsData}
        // search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder ?? 'Select Item'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
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
    width: SW(50),
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
