import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, Fonts } from '@/theme';
import { ms } from 'react-native-size-matters';

const IncludedPlan = ({ data }) => {
  const renderIncluded = ({ item }) => {
    return (
      <>
        <View style={[styles.rowAligned, { marginVertical: ms(5) }]}>
          <View style={styles.outerLine}>
            <View style={styles.innerCircle}></View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.planIncludedText}>{item?.appName}</Text>
          </View>
        </View>
      </>
    );
  };
  return (
    <View>
      <FlatList data={data} renderItem={renderIncluded} />
    </View>
  );
};

export default IncludedPlan;

const styles = StyleSheet.create({
  planIncludedText: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(13),
    marginLeft: ms(10),
  },
  rowJustified: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowAligned: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerLine: {
    borderWidth: ms(1.3),
    borderRadius: ms(15),
    padding: ms(3),
    borderColor: COLORS.dark_grey,
  },
  innerCircle: {
    backgroundColor: COLORS.dark_grey,
    height: ms(10),
    width: ms(10),
    borderRadius: ms(10),
  },
});
