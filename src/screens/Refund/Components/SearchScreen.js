import React, { useRef, useState } from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { useDispatch } from 'react-redux';
import { moderateScale, ms } from 'react-native-size-matters';

import { Fonts, research, scn, search_light } from '@/assets';

import { COLORS, SH, SW } from '@/theme';
import { Spacer } from '@/components';
import BackButton from '@/components/BackButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function SearchScreen() {
  const dispatch = useDispatch();
  const textInputRef = useRef();
  const [sku, setSku] = useState();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.textInputBackground,
      }}
    >
      <View style={styles.inputWraper}>
        <View style={styles.displayRow}>
          <View>
            <Image source={search_light} style={styles.searchStyle} />
          </View>
          <TextInput
            value={sku}
            ref={textInputRef}
            style={styles.searchInput}
            placeholder={'Search invoice here '}
            onChangeText={(sku) => setSku(sku)}
          />
        </View>
        <TouchableOpacity onPress={() => textInputRef.current.focus()}>
          <Image source={scn} style={styles.scnStyle} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          width: windowWidth / 2.3,
        }}
      >
        <Image source={research} style={styles.researchIconstyle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWraper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    marginHorizontal: ms(10),
    borderWidth: 0.5,
    borderRadius: 7,
    height: ms(35),
    width: windowWidth / 2.3,
    borderColor: COLORS.silver_solid,
    top: 20,
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ms(30),
    width: windowWidth / 2.8,
    // borderWidth: 0.5,
    // borderColor: COLORS.silver_solid,
  },
  searchStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(5),
  },
  searchInput: {
    borderRadius: 7,
    height: ms(20),
    width: windowWidth * 0.4,
    fontFamily: Fonts.Italic,
    padding: 0,
    margin: 0,
  },
  scnStyle: {
    width: SW(16),
    height: SW(17),
    resizeMode: 'contain',
    right: 5,
  },
  researchIconstyle: {
    width: SH(210),
    height: SH(210),
    resizeMode: 'contain',
  },
});
