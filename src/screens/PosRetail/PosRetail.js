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
import { CartAmountTips, MainScreen } from './Components';

export function PosRetail() {
  const bodyView = () => {
    // return <MainScreen />;
    return <CartAmountTips />;
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>{bodyView()}</View>
    </ScreenWrapper>
  );
}
