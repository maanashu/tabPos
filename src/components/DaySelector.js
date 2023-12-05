import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SF, SH } from '@/theme';
import { Fonts } from '@/assets';
import { ms } from 'react-native-size-matters';

const selectData = [
  {
    id: 1,
    name: 'Today',
    value: 'today',
  },
  {
    id: 2,
    name: 'Weekly',
    value: 'week',
  },
  {
    id: 3,
    name: 'Monthly',
    value: 'month',
  },
  // {
  //   id: 4,
  //   name: 'Quaterly',
  //   value: 'quarter',
  // },
  // {
  //   id: 5,
  //   name: 'Yearly',
  //   value: 'year',
  // },
];

export function DaySelector({ setSelectTime, selectId, setSelectId, onPresFun }) {
  const ItemSelect = ({ item, onPress, backgroundColor, color }) => (
    <TouchableOpacity style={[styles.selectItemConatiner, backgroundColor]} onPress={onPress}>
      <Text style={[styles.selectText, color]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const selectItem = ({ item }) => {
    const backgroundColor = item.id === selectId ? COLORS.navy_blue : 'transparent';
    const color = item.id === selectId ? COLORS.white : COLORS.navy_blue;

    return (
      <ItemSelect
        item={item}
        onPress={() => (setSelectId(item.id), setSelectTime(item), onPresFun(item.value))}
        backgroundColor={{ backgroundColor }}
        color={{ color }}
      />
    );
  };
  return (
    <FlatList
      data={selectData}
      extraData={setSelectId}
      renderItem={selectItem}
      keyExtractor={(item) => item.id}
      horizontal
      style={{ backgroundColor: COLORS.sky_grey, paddingVertical: ms(5), borderRadius: ms(15) }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  selectItemConatiner: {
    width: SH(90),
    height: SH(28),
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
  },
});
