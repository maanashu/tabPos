import React, { useEffect, useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import { businessTrad, devices, locationRoundNew, pin, store } from '@/assets';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { getUserAddress } from '@/actions/SettingAction';

export function Location() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);
  const getUserLocation = getSettingData?.getUserAddress;

  useEffect(() => {
    if (isFocused) {
      dispatch(getUserAddress());
    }
  }, [isFocused]);

  const locationRenderItem = ({ item, index }) => (
    <View style={styles.locationsView} key={index}>
      <View style={[styles.flexRow, { alignItems: 'flex-start' }]}>
        <Image source={locationRoundNew} style={styles.locationPinStyle} />
        <View style={styles.marginLeft}>
          <Text style={[styles.twoStepText, { fontSize: SF(15), fontFamily: Fonts.SemiBold }]}>
            {item.address_type}
          </Text>
          <Text style={[styles.securitysubhead, { fontSize: SF(12) }]}>{item.custom_address}</Text>
        </View>
      </View>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <Spacer space={SH(30)} />
      <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
        <Image source={devices} style={styles.securityLogo} />
        <View style={styles.twoStepVerifiCon}>
          <Text style={styles.twoStepText}>{strings.settings.businessLocation}</Text>
          <Spacer space={SH(10)} />
          <Text style={styles.securitysubhead}>{strings.settings.locationsubhead}</Text>
          <Spacer space={SH(20)} />
          <View style={{ maxHeight: '82%' }}>
            <FlatList
              data={getUserLocation}
              renderItem={locationRenderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </View>
      {/* </View> */}
    </View>
  );
}
