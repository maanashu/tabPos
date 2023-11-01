import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';

import { Images } from '@mPOS/assets';
import { strings } from '@mPOS/localization';

import styles from '../SubCategory/styles';

const Search = () => {
  return (
    <>
      <View style={styles.searchMainView}>
        <Image source={Images.search} style={styles.searchIconStyle} />

        <TextInput placeholder={strings.checkout.placeholder} style={styles.searchTextInputStyle} />

        <TouchableOpacity style={styles.scannerViewStyle}>
          <Image source={Images.scanner} style={styles.searchIconStyle} />
        </TouchableOpacity>
      </View>

      <Text style={styles.headingText}>{strings.checkout.items}</Text>
    </>
  );
};

export default Search;
