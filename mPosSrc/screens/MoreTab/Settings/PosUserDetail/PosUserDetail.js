import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '@mPOS/assets';
import { Header, ImageView, ScreenWrapper } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import styles from './PosUserDetail.styles';
import { SettingsContainer } from '../Components/SettingsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosUsers } from '@/actions/AuthActions';
import { getAuthData } from '@/selectors/AuthSelector';
import { ms } from 'react-native-size-matters';
import { TYPES } from '@/Types/Types';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { COLORS } from '@/theme';

export function PosUserDetail() {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const posUsers = getAuth?.getAllPosUsersData;

  const handleClick = (item) => {};

  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.retail?.back} />
      <View style={styles.container}></View>
    </ScreenWrapper>
  );
}
