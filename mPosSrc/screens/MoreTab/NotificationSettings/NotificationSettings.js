import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScreenWrapper, Spacer } from '@/components';
import { Header, HorizontalLine } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { getSetting } from '@/selectors/SettingSelector';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { Image } from 'react-native';
import { Images } from '@mPOS/assets';
import styles from './NotificationSettings.styles';
import { upadteApi } from '@/actions/SettingAction';
import { TYPES } from '@/Types/SettingTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { COLORS } from '@/theme';

export function NotificationSettings() {
  const dispatch = useDispatch();
  const [appNotiValue, setappNotiValue] = useState();
  const [isLoading, setIsLoading] = useState('');

  const getSettingData = useSelector(getSetting);

  const settingsData = getSettingData?.getSetting;
  const updateLoading = useSelector((state) => isLoadingSelector([TYPES.UPDATE_API], state));

  const appSettingsData = getSettingData?.getSetting?.app_notifications;
  const smsSettingsData = getSettingData?.getSetting?.sms_notifications;
  const emailSettingsData = getSettingData?.getSetting?.email_notifications;

  const appNotificationKeys = {
    new_order: strings?.notifications?.newOrder,
    cancelled_order: strings?.notifications?.cancelledOrder,
    low_stock_warning: strings?.notifications?.lowStock,
    out_of_stock_alert: strings?.notifications?.outOfStock,
    daily_sales_summary: strings?.notifications?.dailySales,
    unusual_sales_activity: strings?.notifications?.unUsualSales,
    employee_logins: strings?.notifications?.employeeLogins,
  };
  console.log('sjs', smsSettingsData);
  // const appNotificationKeys = {
  //   order_notification_status: strings?.notifications?.newOrder,
  //   order_canceled_status: strings?.notifications?.cancelledOrder,
  //   shipping_notification_status: strings?.notifications?.shippingNoti,
  //   service_notification_status: strings?.notifications?.servicesNoti,
  //   wallet_notification_status: strings?.notifications?.walletNoti,
  //   account_notification_status: strings?.notifications?.accountNoti,
  // };

  const appNotifications = useMemo(() => {
    const fields = [];
    if (appSettingsData) {
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
  }, [settingsData?.app_notifications]);

  const smsNotifications = useMemo(() => {
    const fields = [];
    if (smsSettingsData) {
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
  }, [settingsData?.sms_notifications]);
  // const smsNotifications = useMemo(() => {
  //   const fields = [];

  //   if (!smsSettingsData) {
  //     // If smsSettingsData is null, create initial set of fields with all values set to true
  //     for (const key in appNotificationKeys) {
  //       fields.push({
  //         fieldName: appNotificationKeys[key],
  //         fieldStatus: true, // Set to true for initial case
  //         fieldType: key,
  //       });
  //     }
  //   } else {
  //     // If smsSettingsData is not null, use the existing data
  //     for (const key in appNotificationKeys) {
  //       const value = smsSettingsData[key];
  //       fields.push({
  //         fieldName: appNotificationKeys[key],
  //         fieldStatus: value,
  //         fieldType: key,
  //       });
  //     }
  //   }

  //   return fields;
  // }, [smsSettingsData]);

  const emailNotifications = useMemo(() => {
    const fields = [];
    if (emailSettingsData) {
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
  }, [settingsData?.email_notifications]);

  const appNotiArray = appNotifications?.map((item) => item?.fieldStatus);

  useEffect(() => {
    const hasTrue = appNotiArray.some((value) => value === true);
    setappNotiValue(hasTrue);
  }, [settingsData]);

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

  // const appNotiHandler = useCallback(() => {
  //   const updatedSettings = {};
  //   for (const key in appNotificationKeys) {
  //     updatedSettings[key] = !appNotiValue;
  //   }
  //   dispatch(upadteApi(updatedSettings));
  // }, [appNotiValue]);

  const renderNotifications = ({ item, index, type }) => {
    return (
      <View style={styles.notiView}>
        <Text style={styles.notificationType}>{item.fieldName}</Text>

        {updateLoading && isLoading?.fieldName == item?.fieldName && isLoading?.type == type ? (
          <ActivityIndicator color={COLORS.primary} size={'small'} />
        ) : (
          <TouchableOpacity onPress={() => onPressSettingsHandler(item, index, type)}>
            <Image
              source={item.fieldStatus ? Images.onToggle : Images.offToggle}
              style={styles.toggleBtn}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.notifications?.notifications} />
      <ScrollView
        style={{ padding: ms(20) }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* App Notifications */}
        <View style={styles.notiContainer}>
          <View style={styles.notiHeaderView}>
            <Text style={styles.headerTitle}>{strings?.notifications?.appNotifications}</Text>
            {/* <TouchableOpacity onPress={appNotiHandler}>
              <Image
                source={appNotiValue ? Images.onToggle : Images.offToggle}
                style={styles.toggleBtn}
                resizeMode="contain"
              />
            </TouchableOpacity> */}
          </View>
          <HorizontalLine style={styles.bottomLine} />
          <FlatList
            data={appNotifications}
            renderItem={({ item, index }) => renderNotifications({ item, index, type: '1' })}
            ItemSeparatorComponent={() => <View style={styles.itemSeparatorStyle} />}
          />
        </View>

        <Spacer space={ms(10)} />

        {/* Sms Notifications */}
        <View style={styles.notiContainer}>
          <View style={styles.notiHeaderView}>
            <Text style={styles.headerTitle}>{strings?.notifications?.smsNotifications}</Text>
          </View>
          <HorizontalLine style={styles.bottomLine} />
          <FlatList
            data={smsNotifications}
            renderItem={({ item, index }) => renderNotifications({ item, index, type: '2' })}
            ItemSeparatorComponent={() => <View style={styles.itemSeparatorStyle} />}
          />
        </View>

        <Spacer space={ms(10)} />
        {/* Email Notifications */}
        <View style={styles.notiContainer}>
          <View style={styles.notiHeaderView}>
            <Text style={styles.headerTitle}>{strings?.notifications?.emailNotifications}</Text>
          </View>
          <HorizontalLine style={styles.bottomLine} />
          <FlatList
            data={emailNotifications}
            renderItem={({ item, index }) => renderNotifications({ item, index, type: '3' })}
            ItemSeparatorComponent={() => <View style={styles.itemSeparatorStyle} />}
          />
        </View>

        <Spacer space={ms(30)} />
      </ScrollView>
    </ScreenWrapper>
  );
}
