import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';

import { Images } from '@mPOS/assets';
import { strings } from '@mPOS/localization';
import { styles } from '../styles';
import { ms } from 'react-native-size-matters';
import { COLORS } from '@/theme';

const Search = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: ms(15),
        marginVertical: ms(20),
      }}
    >
      <View style={styles.searchMainView}>
        <Image source={Images.search} style={styles.searchIconStyle} />

        <TextInput placeholder={strings.homeTab.placeholder} style={styles.searchTextInputStyle} />
      </View>

      <TouchableOpacity style={styles.scannerViewStyle}>
        <Image
          source={Images.filter}
          style={{
            width: ms(25),
            height: ms(25),
            resizeMode: 'contain',
            marginTop: ms(13),
          }}
        />
        <Text
          style={{
            paddingVertical: ms(1),
            paddingHorizontal: ms(5),
            marginVertical: 0,
            fontSize: ms(10),
            borderWidth: 1,
            borderRadius: ms(10),
            position: 'absolute',
            bottom: ms(10),
            textAlign: 'center',
            right: ms(3),
            borderColor: COLORS.placeholderText,
            color: COLORS.placeholderText,
          }}
        >
          {'0'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Search;
