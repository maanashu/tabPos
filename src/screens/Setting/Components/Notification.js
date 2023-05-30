import React, { useMemo, useState } from 'react';
import { Button, Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import Modal from 'react-native-modal';
import {
  addIcon,
  blueToothIcon,
  crossButton,
  deviceLogo,
  scanner,
  toggleSecurity,
  trackCamera,
} from '@/assets';
import { deviceDropDownArray } from '@/constants/flatListData';
import { moderateScale, verticalScale } from 'react-native-size-matters';

export function Notification() {
  const renderFlatList = data => (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => (
        <View style={{ marginVertical: verticalScale(3) }} />
      )}
      renderItem={({ item, index }) => (
        <View style={styles.flexRow}>
          <Text style={styles.notificationName}>{item.name}</Text>
          <Image source={toggleSecurity} style={styles.toggleSecurity} />
        </View>
      )}
      keyExtractor={item => item.key}
    />
  );

  const appNotificationArray = useMemo(
    () => [
      {
        key: '1',
        name: 'News and Updates',
        value: 'notification_status',
      },
      {
        key: '2',
        name: 'News and Updates',
        value: 'email_notification_status',
      },
      {
        key: '3',
        name: 'News and Updates',
        value: 'push_notification_status',
      },
    ],
    []
  );

  return (
    <View>
      <View style={[styles.flexRow, { height: SW(8) }]}>
        <Text style={styles.HeaderLabelText}>
          {strings.settings.notification}
        </Text>
      </View>
      <Spacer space={SH(20)} />
      <View style={styles.notificationMainCon}>
        <ScrollView>
          <View style={{ paddingHorizontal: moderateScale(10) }}>
            <Text style={styles.appNotification}>App Notification</Text>
            <View style={styles.horizontalRow} />
            {renderFlatList(appNotificationArray)}
          </View>
          <Spacer space={SH(30)} />
          <View style={{ paddingHorizontal: moderateScale(10) }}>
            <Text style={styles.appNotification}>SMS Notification</Text>
            <View style={styles.horizontalRow} />
            {renderFlatList(appNotificationArray)}
          </View>
          <Spacer space={SH(30)} />
          <View style={{ paddingHorizontal: moderateScale(10) }}>
            <Text style={styles.appNotification}>Email Notification</Text>
            <View style={styles.horizontalRow} />
            {renderFlatList(appNotificationArray)}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
