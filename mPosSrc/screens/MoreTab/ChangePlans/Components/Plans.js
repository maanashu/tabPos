import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, Fonts } from '@/theme';
import { ms } from 'react-native-size-matters';

const Plans = ({ data }) => {
  const renderIncluded = ({ item }) => {
    return (
      <>
        <View style={[styles.rowAligned, { marginVertical: ms(5) }]}>
          <View style={styles.outerLine}>
            <View style={styles.innerCircle}></View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.planIncludedText}>{`JOBR ${item.toUpperCase()}`}</Text>
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

export default Plans;

const styles = StyleSheet.create({
  planIncludedText: {
    color: COLORS.primary,
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
    borderColor: COLORS.primary,
  },
  innerCircle: {
    backgroundColor: COLORS.primary,
    height: ms(10),
    width: ms(10),
    borderRadius: ms(10),
  },
});
