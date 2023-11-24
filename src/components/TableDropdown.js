import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { COLORS, SF, SH, ShadowStyles, SW } from '@/theme';
import { dropdown2, Fonts } from '@/assets';
import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect } from 'react';

export function TableDropdown({ placeholder, selected, data, style, containerStyle }) {
  const [statusModalOpen, setStatusModelOpen] = useState(false);
  const [statusModalValue, setStatusModalValue] = useState(null);
  // const [statusItems, setStatusItems] = useState([{ label: 'none', value: 'none' }, ...data]);
  const initialStatusItems =
    Array.isArray(data) && data.length > 0
      ? [{ label: 'None', value: 'none' }, ...data]
      : [{ label: 'None', value: 'none' }];

  const [statusItems, setStatusItems] = useState(initialStatusItems);

  // { label: 'none', value: 'none' },
  //   { label: 'xyz', value: 'xyz' },
  //   { label: 'abc', value: 'abc' },
  const finalValues = statusModalValue == 'none' ? null : statusModalValue;
  return (
    <DropDownPicker
      ArrowUpIconComponent={({ style }) => <Image source={dropdown2} style={styles.dropDownIcon} />}
      ArrowDownIconComponent={({ style }) => (
        <Image source={dropdown2} style={styles.dropDownIcon} />
      )}
      style={[styles.dropdown, style]}
      containerStyle={[
        styles.containerStyle,
        { zIndex: Platform.OS === 'ios' ? 20 : 99 },
        containerStyle,
      ]}
      dropDownContainerStyle={styles.dropDownContainerStyle}
      listItemLabelStyle={styles.listItemLabelStyle}
      labelStyle={styles.labelStyle}
      selectedItemLabelStyle={styles.selectedItemLabelStyle}
      open={statusModalOpen}
      value={finalValues}
      items={statusItems}
      setOpen={setStatusModelOpen}
      setValue={setStatusModalValue}
      // setItems={setStatusItems}
      placeholder={placeholder}
      placeholderStyle={styles.placeholderStyle}
      onSelectItem={(item) => selected(item.value)}
    />
  );
}

const styles = StyleSheet.create({
  dropDownIcon: {
    width: SW(4),
    height: SW(4),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
  },
  dropdown: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    zIndex: Platform.OS === 'ios' ? 100 : 99,
  },
  containerStyle: {
    width: SW(50),
    height: SH(35),
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: COLORS.navy_blue,
  },
  dropDownContainerStyle: {
    borderWidth: 1,
    borderColor: COLORS.navy_blue,
    borderRadius: 7,
    ...ShadowStyles.shadow2,
    backgroundColor: COLORS.white,
    top: 40,
    zIndex: Platform.OS === 'ios' ? 100 : 1,
  },
  listItemLabelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    color: COLORS.navy_blue,
  },
  labelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.SemiBold,
    color: COLORS.navy_blue,
  },
  selectedItemLabelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  placeholderStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Medium,
    color: COLORS.navy_blue,
  },
});
