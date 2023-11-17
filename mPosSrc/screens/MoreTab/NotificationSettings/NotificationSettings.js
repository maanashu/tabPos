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
import styles from './NotificationSettings.styles';
import { upadteApi } from '@/actions/SettingAction';

export function NotificationSettings() {
  const dispatch = useDispatch();
  const [appNotiValue, setappNotiValue] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getSettingData = useSelector(getSetting);

  const settingsData = getSettingData?.getSetting;
  const appNotificationKeys = {
    order_notification_status: strings?.notifications?.newOrder,
    order_canceled_status: strings?.notifications?.cancelledOrder,
    shipping_notification_status: strings?.notifications?.shippingNoti,
    service_notification_status: strings?.notifications?.servicesNoti,
    wallet_notification_status: strings?.notifications?.walletNoti,
    account_notification_status: strings?.notifications?.accountNoti,
  };

  const appNotifications = useMemo(() => {
    const fields = [];
    if (settingsData) {
      for (const key in appNotificationKeys) {
        const value = settingsData[key];
        fields.push({
          fieldName: appNotificationKeys[key],
          fieldStatus: value,
          fieldType: key,
        });
      }
    }
    return fields;
  }, [settingsData]);

  const appNotiArray = appNotifications?.map((item) => item?.fieldStatus);

  useEffect(() => {
    const hasTrue = appNotiArray.some((value) => value === true);
    setappNotiValue(hasTrue);
  }, [settingsData]);

  const onPressSettingsHandler = useCallback((item, idx) => {
    const updatedSettings = {
      [item.fieldType]: !item.fieldStatus,
    };
    dispatch(upadteApi(updatedSettings));
  }, []);

  const appNotiHandler = useCallback(() => {
    const updatedSettings = {};
    for (const key in appNotificationKeys) {
      updatedSettings[key] = !appNotiValue;
    }
    dispatch(upadteApi(updatedSettings));
  }, [appNotiValue]);

  const renderNotifications = ({ item, index }) => {
    return (
      <View style={styles.notiView}>
        <Text style={styles.notificationType}>{item.fieldName}</Text>

        <TouchableOpacity onPress={() => onPressSettingsHandler(item, index)}>
          <Image
            source={item.fieldStatus ? Images.onToggle : Images.offToggle}
            style={styles.toggleBtn}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.notifications?.notifications} />
      <View style={{ flex: 1, padding: ms(20) }}>
        <View style={styles.notiContainer}>
          <View style={styles.notiHeaderView}>
            <Text style={styles.headerTitle}>{strings?.notifications?.appNotifications}</Text>
            <TouchableOpacity onPress={appNotiHandler}>
              <Image
                source={appNotiValue ? Images.onToggle : Images.offToggle}
                style={styles.toggleBtn}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <HorizontalLine style={styles.bottomLine} />
          <FlatList
            data={appNotifications}
            renderItem={renderNotifications}
            ItemSeparatorComponent={() => <View style={styles.itemSeparatorStyle} />}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
