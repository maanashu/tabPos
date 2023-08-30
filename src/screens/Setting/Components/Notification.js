import React, { useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { SH, SW } from '@/theme';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import { vector, vectorOff } from '@/assets';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { upadteApi } from '@/actions/SettingAction';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';

export function Notification() {
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);

  const [appNotificationArray, setAppNotificationArray] = useState([
    // {
    //   key: '1',
    //   name: 'Sms Notifications',
    //   value: 'notification_status',
    //   isSelected: getSettingData?.getSetting?.notification_status ?? false,
    // },
    // {
    //   key: '2',
    //   name: 'Email Notifications',
    //   value: 'email_notification_status',
    //   isSelected:
    //     getSettingData?.getSetting?.email_notification_status ?? false,
    // },
    {
      key: '3',
      name: 'Order Notifications',
      value: 'order_notification_status',
      isSelected: getSettingData?.getSetting?.order_notification_status ?? false,
    },
    {
      key: '4',
      name: 'Shipping Notifications',
      value: 'shipping_notification_status',
      isSelected: getSettingData?.getSetting?.shipping_notification_status ?? false,
    },
    {
      key: '5',
      name: 'Services Notifications',
      value: 'service_notification_status',
      isSelected: getSettingData?.getSetting?.service_notification_status ?? false,
    },
    {
      key: '6',
      name: 'Wallet Notifications',
      value: 'wallet_notification_status',
      isSelected: getSettingData?.getSetting?.wallet_notification_status ?? false,
    },
    {
      key: '7',
      name: 'Account Notifications',
      value: 'account_notification_status',
      isSelected: getSettingData?.getSetting?.account_notification_status ?? false,
    },
    // {
    //   key: '3',
    //   name: 'Push notifications',
    //   value: 'push_notification_status',
    //   isSelected: getSettingData?.getSetting?.push_notification_status ?? false,
    // },
  ]);

  const handleToggle = (index) => {
    setAppNotificationArray((prevState) => {
      const newArray = [...prevState];
      newArray[index].isSelected = !newArray[index].isSelected;

      const data = {
        [newArray[index].value]: newArray[index].isSelected,
      };
      dispatch(upadteApi(data));
      return newArray;
    });
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.flexRow}>
      <Text style={styles.notificationName}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleToggle(index)}>
        <Image source={item.isSelected ? vector : vectorOff} style={styles.toggleSecurity} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <View style={[styles.flexRow, { height: SW(8) }]}>
        <Text style={styles.HeaderLabelText}>{strings.settings.notification}</Text>
      </View>
      <Spacer space={SH(20)} />
      <View style={styles.notificationMainCon}>
        <View style={{ paddingHorizontal: moderateScale(10) }}>
          <View style={styles.horizontalRow} />
          <FlatList
            data={appNotificationArray}
            ItemSeparatorComponent={() => <View style={{ marginVertical: verticalScale(3) }} />}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
          />
        </View>
      </View>
    </View>
  );
}
