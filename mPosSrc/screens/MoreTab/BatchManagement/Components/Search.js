import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

import { Images } from '@mPOS/assets';
import { strings } from '@mPOS/localization';
import { ms } from 'react-native-size-matters';
import { COLORS, Fonts } from '@/theme';

const Search = ({ value, onChangeText, filterHandler, selectFilterCount }) => {
  return (
    <View style={styles.searchView}>
      <View style={styles.searchMainView}>
        <Image source={Images.search} style={styles.searchIconStyle} />

        <TextInput
          placeholder={strings.homeTab.placeholder}
          style={styles.searchTextInputStyle}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={COLORS.gerySkies}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.scannerViewStyle,
          { backgroundColor: selectFilterCount > 0 ? COLORS.blue_shade : COLORS.white },
        ]}
        onPress={filterHandler}
      >
        <Image
          source={Images.filter}
          style={[
            styles.filterImage,
            { tintColor: selectFilterCount > 0 ? COLORS.primary : COLORS.gerySkies },
          ]}
        />
        <View
          style={[
            styles.filterCountCon,
            { borderColor: selectFilterCount > 0 ? COLORS.primary : COLORS.gerySkies },
          ]}
        >
          <Text
            style={[
              styles.filterCountText,
              { color: selectFilterCount > 0 ? COLORS.primary : COLORS.gerySkies },
            ]}
          >
            {selectFilterCount}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: ms(11),
    marginVertical: ms(12),
  },
  searchMainView: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    flex: 0.85,
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
    // width: ms(50),
    height: ms(44),
    marginLeft: ms(15),
    flex: 0.18,
  },
  filterImage: {
    width: ms(18),
    height: ms(18),
    resizeMode: 'contain',
    marginTop: ms(13),
  },
  filterCountCon: {
    width: ms(15),
    height: ms(15),
    borderWidth: 1,
    borderRadius: ms(10),
    position: 'absolute',
    bottom: ms(7),
    justifyContent: 'center',
    alignItems: 'center',
    right: ms(7),
  },
  filterCountText: {
    fontSize: ms(9),
    fontFamily: Fonts.Regular,
  },
});
