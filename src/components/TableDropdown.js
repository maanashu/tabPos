import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { COLORS, SF, SH, ShadowStyles, SW } from '@/theme';
import { dropdown2, Fonts } from '@/assets';
import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect } from 'react';

export function TableDropdown({ placeholder, selected, data }) {
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
      style={styles.dropdown}
      containerStyle={[styles.containerStyle, { zIndex: Platform.OS === 'ios' ? 20 : 2 }]}
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
    tintColor: COLORS.solidGrey,
  },
  dropdown: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    zIndex: Platform.OS === 'ios' ? 100 : 0,
  },
  containerStyle: {
    width: SW(50),
    height: SH(35),
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: COLORS.solidGrey,
  },
  dropDownContainerStyle: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    ...ShadowStyles.shadow2,
    backgroundColor: COLORS.white,
    top: Platform.OS === 'android' ? 40 : 32,
    zIndex: Platform.OS === 'ios' ? 100 : 1,
  },
  listItemLabelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  labelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  selectedItemLabelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  placeholderStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    color: COLORS.gerySkies,
  },
});
