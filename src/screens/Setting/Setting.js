import React, { useEffect, useState } from 'react';
import { ScreenWrapper } from '@/components';
import { COLORS, SF, SH } from '@/theme';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import { right_light } from '@/assets';

import { settingLabelData } from '@/constants/flatListData';
import {
  Device,
  Invoices,
  Location,
  Notification,
  Plans,
  Security,
  Taxes,
  Wallet,
  Shipping,
  Languages,
  Legal,
  Policies,
  Staff,
} from '@/screens/Setting/Components';
import { getSettings } from '@/actions/SettingAction';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { ActivityIndicator } from 'react-native';
import { TYPES } from '@/Types/SettingTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { useIsFocused } from '@react-navigation/native';
import { getAuthData } from '@/selectors/AuthSelector';
import { strings } from '@/localization';
import { getAllPlans } from '@/actions/SubscriptionAction';
import { getAppointmentSelector } from '@/selectors/AppointmentSelector';

export function Setting() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const getSettingData = useSelector(getSetting);
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const posUserArray = getAuth?.getAllPosUsers;
  const [selectedId, setSelectedId] = useState(1);
  const [security, setSecurity] = useState(false);
  const [device, setDevice] = useState(false);
  const onpressFun = (id) => {
    if (id === 1) {
      setSecurity(true), setDevice(false);
    } else if (id === 2) {
      setDevice(true), setSecurity(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getSettings());

      // dispatch(getShippingPickup());
    }
  }, [isFocused]);

  const isLoad = useSelector((state) =>
    isLoadingSelector(
      [
        TYPES.UPDATE_API,
        TYPES.GET_SETTING,
        TYPES.GET_SHIPPICK,
        TYPES.ADDRESS_UPDATE,
        TYPES.GET_USER_ADD,
        // TYPES.GET_ALL_POS_USERS,
        TYPES.STAFF_DETAIL,
        TYPES.GET_TAX,
        TYPES.VERIFY_GOOGLE_CODE,
        // TYPES.STAFF_REQUEST,
        TYPES.GET_STAFF_TRANSACTION,
      ],
      state
    )
  );

  const renderView = {
    [1]: <Security />,
    [2]: <Device />,
    [3]: <Notification />,
    [4]: <Location />,
    [5]: <Plans />,
    [6]: <Invoices />,
    [7]: <Taxes />,
    [8]: <Wallet />,
    [9]: <Shipping />,
    [10]: <Staff />,
    [11]: <Languages />,
    [12]: <Legal />,
    [13]: <Policies />,
    [14]: (
      <View>
        <Text>Device Detail</Text>
      </View>
    ),
  };

  const Item = ({ item, onPress, backgroundColor, textColor, borderColor, tintAndColor }) => (
    <TouchableOpacity
      style={[styles.headingBody, { backgroundColor, borderColor }]}
      onPress={onPress}
    >
      <View style={styles.flexRow}>
        <View style={styles.dispalyRow}>
          <Image source={item.image} style={[styles.security, { tintColor: tintAndColor }]} />
          <View style={{ marginLeft: 6 }}>
            <Text style={[styles.securityText, { color: textColor }]}>{item.name}</Text>
            <Text style={[styles.notUpdated, { color: tintAndColor }]}>
              {item?.name == 'Staffs' ? posUserArray?.length : item.subhead}
            </Text>
          </View>
        </View>
        <Image source={right_light} style={[styles.right_light, { tintColor: tintAndColor }]} />
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? COLORS.blue_shade : '#transparent';
    const tintAndColor = item.id === selectedId ? COLORS.primary : COLORS.darkGray;
    const borderColor = item.id === selectedId ? COLORS.blue_shade : COLORS.solidGrey;
    const color = item.id === selectedId ? COLORS.primary : COLORS.black;

    return (
      <>
        {/* {item?.name == strings.legal.LegalText ||
        item?.name == strings.Policies.PoliciesText ||
        item?.name == strings.deviceDetails.deviceDetailsText 
        ? null : ( */}
        <Item
          item={item}
          onPress={() => (setSelectedId(item.id), onpressFun(item.id))}
          backgroundColor={backgroundColor}
          textColor={color}
          tintAndColor={tintAndColor}
          borderColor={borderColor}
        />
        {/* )} */}
      </>
    );
  };
  const bodyView = () => {
    return renderView[selectedId];
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.dispalyRow}>
          <View style={styles.headingCon}>
            <View>
              <FlatList
                data={settingLabelData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
              />
            </View>
          </View>
          <View style={styles.DataCon}>{bodyView()}</View>
        </View>
      </View>
      {isLoad ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
          <ActivityIndicator color={COLORS.primary} size="large" style={styles.loader} />
        </View>
      ) : null}
    </ScreenWrapper>
  );
}
