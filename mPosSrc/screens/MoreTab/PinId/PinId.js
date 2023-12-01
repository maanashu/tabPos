import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/UserSelectors';
import { Spacer, ScreenWrapper, Header } from '@mPOS/components';
import { styles } from './PinId.styles';

import { navigate } from '@mPOS/navigation/NavigationRef';
// import { NAVIGATION } from '@/constants';
import { ms } from 'react-native-size-matters';
import { Images } from '@mPOS/assets';
import { SH } from '@/theme';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
export function PinId() {
  const dispatch = useDispatch();
  const [biometricType, setBioMetricType] = useState('Fingerprint');

  return (
    <ScreenWrapper>
      <Header title={'PIN'} backRequired />
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <Image source={Images.lockPin} resizeMode="contain" style={styles.face} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardName}>PIN</Text>

        <View style={styles.rowJustified}>
          <View style={styles.rowAligned}>
            <Image source={Images.lock_light} resizeMode="contain" style={styles.lockIconStyle} />
            <Text style={styles.changePinTextStyle}>Change Pin</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigate(MPOS_NAVIGATION.oldPin)}
            style={{ paddingLeft: ms(10) }}
          >
            <Image
              source={Images.right_light}
              resizeMode="contain"
              style={styles.rightArrowStyle}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomLine} />
        <Text style={styles.bottomTextStyle}>
          {
            'It is a long established fact that a reader will be distracted by the readable content.'
          }
        </Text>
      </View>

      <Spacer space={SH(30)} />
    </ScreenWrapper>
  );
}
