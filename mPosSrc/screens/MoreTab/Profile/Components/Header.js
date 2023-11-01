import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import { Images } from '@mPOS/assets';
import { strings } from '@mPOS/localization';
import { NAVIGATION } from '@mPOS/constants';
import { goBack, navigate } from '@mPOS/navigation/NavigationRef';

import styles from '../Profile.styles';

const Header = () => {
  return (
    <View style={styles.headerView}>
      <TouchableOpacity onPress={() => goBack()} style={styles.backViewStyle}>
        <Image source={Images.back} style={styles.backArrowStyle} />
        <Text style={styles.backTextStyle}>{strings.profile.header}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate(NAVIGATION.profileQRCode)}>
        <Image source={Images.qrCode} style={styles.qrCodeImageStyle} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
