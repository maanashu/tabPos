import React, { useCallback, useMemo, useState } from 'react';
import { Spacer } from '@/components';
import { SH, SW } from '@/theme';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import { newToggleOff, toggleOnNavyBlue, vector, vectorOff } from '@/assets';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { upadteApi } from '@/actions/SettingAction';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { strings } from '@mPOS/localization';

export function Notification() {
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);
  const [isLoading, setIsLoading] = useState('');

  const appSettingsData = getSettingData?.getSetting?.app_notifications;
  const smsSettingsData = getSettingData?.getSetting?.sms_notifications;
  const emailSettingsData = getSettingData?.getSetting?.email_notifications;
  // console.log('appSettings =>', appSettingsData);

  // const [appNotificationArray, setAppNotificationArray] = useState([
  //   {
  //     key: '3',
  //     name: 'Order Notifications',
  //     value: 'order_notification_status',
  //     isSelected: getSettingData?.getSetting?.order_notification_status ?? false,
  //   },
  //   {
  //     key: '4',
  //     name: 'Shipping Notifications',
  //     value: 'shipping_notification_status',
  //     isSelected: getSettingData?.getSetting?.shipping_notification_status ?? false,
  //   },
  //   {
  //     key: '5',
  //     name: 'Services Notifications',
  //     value: 'service_notification_status',
  //     isSelected: getSettingData?.getSetting?.service_notification_status ?? false,
  //   },
  //   {
  //     key: '6',
  //     name: 'Wallet Notifications',
  //     value: 'wallet_notification_status',
  //     isSelected: getSettingData?.getSetting?.wallet_notification_status ?? false,
  //   },
  //   {
  //     key: '7',
  //     name: 'Account Notifications',
  //     value: 'account_notification_status',
  //     isSelected: getSettingData?.getSetting?.account_notification_status ?? false,
  //   },
  //   // {
  //   //   key: '3',
  //   //   name: 'Push notifications',
  //   //   value: 'push_notification_status',
  //   //   isSelected: getSettingData?.getSetting?.push_notification_status ?? false,
  //   // },
  // ]);

  // const handleToggle = (index) => {
  //   setAppNotificationArray((prevState) => {
  //     const newArray = [...prevState];
  //     newArray[index].isSelected = !newArray[index].isSelected;

  //     const data = {
  //       [newArray[index].value]: newArray[index].isSelected,
  //     };
  //     dispatch(upadteApi(data));
  //     return newArray;
  //   });
  // };

  const appNotificationKeys = {
    new_order: strings?.notifications?.newOrder,
    cancelled_order: strings?.notifications?.cancelledOrder,
    low_stock_warning: strings?.notifications?.lowStock,
    out_of_stock_alert: strings?.notifications?.outOfStock,
    daily_sales_summary: strings?.notifications?.dailySales,
    unusual_sales_activity: strings?.notifications?.unUsualSales,
    employee_logins: strings?.notifications?.employeeLogins,
  };
  const appNotifications = useMemo(() => {
    const fields = [];
    if (!appSettingsData) {
      // If appSettingsData is null, create initial set of fields with all values set to false
      for (const key in appNotificationKeys) {
        fields.push({
          fieldName: appNotificationKeys[key],
          fieldStatus: false, // Set to false for initial case
          fieldType: key,
        });
      }
    } else {
      // If appSettingsData is not null, use the existing data
      for (const key in appNotificationKeys) {
        const value = appSettingsData[key];
        fields.push({
          fieldName: appNotificationKeys[key],
          fieldStatus: value,
          fieldType: key,
        });
      }
    }

    return fields;
  }, [appSettingsData]);
  const smsNotifications = useMemo(() => {
    const fields = [];
    if (!smsSettingsData) {
      for (const key in appNotificationKeys) {
        fields.push({
          fieldName: appNotificationKeys[key],
          fieldStatus: false,
          fieldType: key,
        });
      }
    } else {
      for (const key in appNotificationKeys) {
        const value = smsSettingsData[key];
        fields.push({
          fieldName: appNotificationKeys[key],
          fieldStatus: value,
          fieldType: key,
        });
      }
    }

    return fields;
  }, [smsSettingsData]);

  const emailNotifications = useMemo(() => {
    const fields = [];

    if (!emailSettingsData) {
      for (const key in appNotificationKeys) {
        fields.push({
          fieldName: appNotificationKeys[key],
          fieldStatus: false,
          fieldType: key,
        });
      }
    } else {
      for (const key in appNotificationKeys) {
        const value = emailSettingsData[key];
        fields.push({
          fieldName: appNotificationKeys[key],
          fieldStatus: value,
          fieldType: key,
        });
      }
    }

    return fields;
  }, [emailSettingsData]);

  const onPressSettingsHandler = useCallback((item, idx, type) => {
    let updatedSettings;
    if (type == '1') {
      updatedSettings = {
        app_notifications: {
          [item.fieldType]: !item.fieldStatus,
        },
      };
    } else if (type == '2') {
      updatedSettings = {
        sms_notifications: {
          [item.fieldType]: !item.fieldStatus,
        },
      };
    } else if (type == '3') {
      updatedSettings = {
        email_notifications: {
          [item.fieldType]: !item.fieldStatus,
        },
      };
    }
    dispatch(upadteApi(updatedSettings));
    setIsLoading({ ...item, type });
  }, []);

  const renderItem = ({ item, index, type }) => (
    <View style={styles.flexRow}>
      <Text style={styles.notificationName}>{item.fieldName}</Text>
      <TouchableOpacity onPress={() => onPressSettingsHandler(item, index, type)}>
        <Image
          source={item.fieldStatus ? toggleOnNavyBlue : newToggleOff}
          style={styles.toggleSecurity}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* App Notifications */}
      <View>
        <View style={[styles.flexRow, { height: SW(8), paddingHorizontal: moderateScale(10) }]}>
          <Text style={styles.HeaderLabelText}>{strings.notifications.appNotifications}</Text>
        </View>
        <Spacer space={SH(5)} />
        <View style={styles.notificationMainCon}>
          <View style={{ paddingHorizontal: moderateScale(10) }}>
            <View style={styles.horizontalRow} />
            <Spacer space={SH(5)} />
            <FlatList
              data={appNotifications}
              ItemSeparatorComponent={() => <View style={{ marginVertical: verticalScale(3) }} />}
              renderItem={({ item, index }) => renderItem({ item, index, type: '1' })}
              keyExtractor={(item) => item.key}
            />
          </View>
        </View>
      </View>

      {/* Sms Notifications */}
      <View style={{ marginTop: SH(25) }}>
        <View style={[styles.flexRow, { height: SW(10), paddingHorizontal: moderateScale(10) }]}>
          <Text style={styles.HeaderLabelText}>{strings.notifications.smsNotifications}</Text>
        </View>
        <Spacer space={SH(5)} />
        <View style={styles.notificationMainCon}>
          <View style={{ paddingHorizontal: moderateScale(10) }}>
            <View style={styles.horizontalRow} />
            <Spacer space={SH(5)} />
            <FlatList
              data={smsNotifications}
              ItemSeparatorComponent={() => <View style={{ marginVertical: verticalScale(3) }} />}
              renderItem={({ item, index }) => renderItem({ item, index, type: '2' })}
              keyExtractor={(item) => item.key}
            />
          </View>
        </View>
      </View>

      {/* Email Notifications */}

      <View style={{ marginTop: SH(25) }}>
        <View style={[styles.flexRow, { height: SW(8), paddingHorizontal: moderateScale(10) }]}>
          <Text style={styles.HeaderLabelText}>{strings.notifications.emailNotifications}</Text>
        </View>
        <Spacer space={SH(5)} />
        <View style={styles.notificationMainCon}>
          <View style={{ paddingHorizontal: moderateScale(10) }}>
            <View style={styles.horizontalRow} />
            <Spacer space={SH(5)} />
            <FlatList
              data={emailNotifications}
              ItemSeparatorComponent={() => <View style={{ marginVertical: verticalScale(3) }} />}
              renderItem={({ item, index }) => renderItem({ item, index, type: '3' })}
              keyExtractor={(item) => item.key}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
