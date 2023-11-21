import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ScreenWrapper } from '@/components';
import { Header, HorizontalLine } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { getSetting } from '@/selectors/SettingSelector';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { Image } from 'react-native';
import { Images } from '@mPOS/assets';
import styles from './HelpCenter.styles';
import { upadteApi } from '@/actions/SettingAction';

export function HelpCenter() {
  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.help?.helpCenter} />
    </ScreenWrapper>
  );
}
