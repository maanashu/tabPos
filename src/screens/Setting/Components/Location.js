import React, { useEffect, useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import {
  businessTrad,
  devices,
  locationRoundNew,
  pin,
  store,
  ToggleOnNew,
  vectorOff,
} from '@/assets';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { getShippingPickup, getUserAddress, updateAddressStatus } from '@/actions/SettingAction';

export function Location() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);
  const getUserLocation = getSettingData?.getUserAddress;
  const shippingpickupData = getSettingData?.getShippingPickup;

  useEffect(() => {
    if (isFocused) {
      // dispatch(getUserAddress());
      dispatch(getShippingPickup());
    }
  }, [isFocused]);

  const changeLocationStatus = (id, status) => {
    const data = {
      id: id,
      is_active: status ? false : true,
    };
    dispatch(updateAddressStatus(data));
  };

  const locationRenderItem = ({ item, index }) => (
    <View style={styles.locationsView} key={index}>
      <View style={[styles.flexRow]}>
        <Image source={locationRoundNew} style={[styles.locationPinStyle]} />
        <View style={styles.marginLeftNew}>
          {item?.address_type !== null && (
            <Text style={[styles.twoStepText, { fontSize: SF(15), fontFamily: Fonts.SemiBold }]}>
              {item?.address_type}
            </Text>
          )}

          <Text style={[styles.securitysubhead, { fontSize: SF(12) }]}>
            {item?.format_address}
            {'\n'}
            {item?.street_address}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => changeLocationStatus(item?.id, item?.is_active)}
          // disabled={item.is_active ? false : true}
          style={!item?.is_active && { opacity: 0.5 }}
        >
          <Image
            source={item?.is_active ? ToggleOnNew : vectorOff}
            style={[styles.toggleSecurityLarge]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      {/* <Spacer space={SH(30)} /> */}
      <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
        <Image source={devices} style={styles.securityLogo} />
        <View style={styles.twoStepVerifiCon}>
          <Text style={styles.twoStepText}>{strings.settings.businessLocation}</Text>
          <Spacer space={SH(10)} />
          <Text style={styles.securitysubhead}>{strings.settings.locationsubhead}</Text>
          <Spacer space={SH(20)} />
          <View style={{ maxHeight: '82%' }}>
            <FlatList
              data={shippingpickupData}
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
