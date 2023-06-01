import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { ShadowStyles } from '@/theme';
import { strings } from '@/localization';
import { login, TYPES } from '@/actions/UserActions';
import { Button, ErrorView, ScreenWrapper, TextField } from '@/components';
import { errorsSelector } from '@/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

import { styles } from '@/screens/PosRetail/PosRetail.styles';
import { crossBg } from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';

export function MainScreen() {
  return (
    <View style={styles.homeScreenCon}>
      <View style={styles.searchScreenHeader}>
        <View style={styles.displayflex}>
          <Text style={styles.cashLabelBold}>Wed 26 Apr , 2023</Text>
          <Text style={styles.cashLabelBold}>Walk-In</Text>
          <Text style={styles.cashLabelBold}>Invoice No. # 3467589</Text>
          <Text style={styles.cashLabelBold}>POS No. #Front-CC01</Text>
          <TouchableOpacity>
            <Image source={crossBg} style={styles.crossBg} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
