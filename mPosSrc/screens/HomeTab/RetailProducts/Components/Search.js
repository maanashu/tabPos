import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

import { Images } from '@mPOS/assets';
import { strings } from '@mPOS/localization';
import { ms } from 'react-native-size-matters';
import { COLORS, Fonts } from '@/theme';

const Search = ({ value, onChangeText, filterHandler }) => {
  return (
    <View style={styles.searchView}>
      <View style={styles.searchMainView}>
        <Image source={Images.search} style={styles.searchIconStyle} />

        <TextInput
          placeholder={strings.homeTab.placeholder}
          style={styles.searchTextInputStyle}
          value={value}
          onChangeText={onChangeText}
        />
      </View>

      <TouchableOpacity style={styles.scannerViewStyle} onPress={filterHandler}>
        <Image source={Images.filter} style={styles.filterImage} />
        <Text style={styles.filterCount}>{'0'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: ms(11),
    marginVertical: ms(12),
  },
  searchMainView: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  searchIconStyle: {
    width: ms(25),
    height: ms(25),
    resizeMode: 'contain',
    // tintColor: COLORS.light_border
  },
  searchTextInputStyle: {
    height: ms(40),
    width: ms(240),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: Fonts.Italic,
    fontSize: ms(12),
  },
  scannerViewStyle: {
    borderRadius: 7,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    // justifyContent: 'center',
    width: ms(50),
    height: ms(44),
    marginLeft: ms(15),
  },
  filterImage: {
    width: ms(18),
    height: ms(18),
    resizeMode: 'contain',
    marginTop: ms(13),
  },
  filterCount: {
    width: ms(15),
    height: ms(15),
    // // paddingVertical: ms(1),
    // paddingHorizontal: ms(3),
    marginVertical: 0,
    fontSize: ms(10),
    borderWidth: 1,
    borderRadius: ms(10),
    position: 'absolute',
    bottom: ms(7),
    textAlign: 'center',
    right: ms(7),
    borderColor: COLORS.placeholderText,
    color: COLORS.placeholderText,
  },
});
