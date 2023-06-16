import React, { useEffect, useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import { businessTrad, store } from '@/assets';
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
    <View style={styles.twoStepMemberCon} key={index}>
      <View style={styles.flexRow}>
        <View style={styles.dispalyRow}>
          <Image source={store} style={styles.teamMember} />
          <View style={styles.marginLeft}>
            <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
              Wear House
            </Text>
            <Text style={[styles.securitysubhead, { fontSize: SF(12) }]}>
              2598 West Street, Holland, MI 49424
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.flexRow, { height: SW(8) }]}>
        <Text style={styles.HeaderLabelText}>{strings.settings.location}</Text>
      </View>
      <Spacer space={SH(20)} />
      <View style={styles.securityMainCon}>
        <View style={styles.securityBodyCon}>
          {/* <View style={{borderWidth:1, padding:20}}> */}
          <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
            <Image source={businessTrad} style={styles.securityLogo} />
            <View style={styles.twoStepVerifiCon}>
              <Text style={styles.twoStepText}>
                {strings.settings.businessLocation}
              </Text>
              <Spacer space={SH(10)} />
              <Text style={styles.securitysubhead}>
                {strings.settings.locationsubhead}
              </Text>
              <Spacer space={SH(20)} />
              <View style={{ maxHeight: '82%' }}>
                <FlatList
                  data={getUserLocation}
                  renderItem={locationRenderItem}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
          </View>
          {/* </View> */}
        </View>
      </View>
    </View>
  );
}
