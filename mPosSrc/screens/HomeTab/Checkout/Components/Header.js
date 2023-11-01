import React from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';

import { Images } from '@mPOS/assets';
import { strings } from '@mPOS/localization';
import { goBack } from '@mPOS/navigation/NavigationRef';

import styles from '../styles';

const Header = () => {
  return (
    <TouchableOpacity onPress={() => goBack()} style={styles.headerMainView}>
      <Image source={Images.back} style={styles.backImageStyle} />
      <Text style={styles.headerText}>{strings.profile.header}</Text>
    </TouchableOpacity>
  );
};

export default Header;
