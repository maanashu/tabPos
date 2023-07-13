import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  SectionList,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import {
  cash,
  wallet,
  bankLogo,
  userImage,
  backArrow,
  cashProfile,
  blankCheckBox,
  settingsIcon,
} from '@/assets';
import { COLORS } from '@/theme';
import { strings } from '@/localization';
import { TYPES } from '@/Types/SettingTypes';
import { getSetting } from '@/selectors/SettingSelector';
import { goBack, navigate } from '@/navigation/NavigationRef';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { fetchAllNotifications } from '@/actions/SettingAction';

moment.suppressDeprecationWarnings = true;

import { styles } from './styles';

export default function NotificationsList(props) {
  const screen = props?.route?.params?.screen;
  const dispatch = useDispatch();
  const notifications = useSelector(getSetting)?.notifications;

  useEffect(() => {
    dispatch(fetchAllNotifications());
  }, []);

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.FETCH_ALL_NOTIFICATIONS], state)
  );

  const sectionedNotifications = useMemo(() => {
    return notifications?.reduce((acc, curr) => {
      const date = moment(curr?.notification?.created_at).format(
        'MMMM DD, YYYY'
      );
      let title = date;
      if (moment(date).isSame(moment(), strings.common.day)) {
        title = strings.common.today;
      } else if (
        moment(date).isSame(
          moment().subtract(1, strings.common.days),
          strings.common.day
        )
      ) {
        title = strings.common.yesterday;
      }
      const groupIndex = acc?.findIndex(group => group?.title === title);
      if (groupIndex === -1) {
        acc.push({
          title,
          data: [{ ...curr }],
        });
      } else {
        acc[groupIndex].data.push({ ...curr });
      }
      return acc;
    }, []);
  }, [notifications]);

  const notificationIcons = item => {
    if (item?.notification?.event_name === 'payment_request_recieved') {
      return (
        <>
          {item?.notification?.user_image ? (
            <Image
              style={styles.notificationImg}
              source={{
                uri: item?.notification?.user_image,
              }}
            />
          ) : (
            <Image style={styles.notificationImg} source={cashProfile} />
          )}
        </>
      );
    } else if (item?.notification?.event_name === 'wallet_setting_updated') {
      return <Image style={styles.notificationImg} source={settingsIcon} />;
    } else if (item?.notification?.event_name === 'wallet_created') {
      return <Image style={styles.notificationImg} source={wallet} />;
    } else if (item?.notification?.event_name === 'wallet_recharge_request') {
      return (
        <Image
          style={[styles.notificationImg, { tintColor: COLORS.primary }]}
          source={cash}
        />
      );
    } else if (
      item?.notification?.event_name === 'balance_withdraw' ||
      item?.notification?.event_name === 'bank_account_added' ||
      item?.notification?.event_name === 'bank_account_deleted'
    ) {
      return <Image style={styles.notificationImg} source={bankLogo} />;
    } else {
      return (
        <Image
          style={styles.notificationImg}
          source={
            item?.notification?.user_image
              ? { uri: item?.notification?.user_image }
              : cashProfile
          }
        />
      );
    }
  };

  const customHeader = () => (
    <View style={styles.headerMainView}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          screen ? navigate(screen) : goBack();
        }}
        style={styles.backViewStyle}
      >
        <Image source={backArrow} style={styles.backIconStyle} />
        <Text style={styles.headerTitle}>{strings.notifications.header}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.notificationItem,
        !item?.is_read && { backgroundColor: COLORS.inputBorder },
      ]}
    >
      <View style={styles.imgContainer}>
        {notificationIcons(item)}
        <View style={styles.notificationTextView}>
          <Text style={styles.notificationTitle}>
            {item?.notification?.title}
          </Text>
          <Text style={styles.notificationDescrip}>
            {item?.notification?.description.length > 70
              ? `${item?.notification?.description?.slice(0, 70)}...`
              : item?.notification?.description}
          </Text>
        </View>
      </View>
      <View style={styles.notificationTime}>
        <Text style={styles.notificationTimeText}>
          {moment(item?.notification?.created_at).fromNow()}
        </Text>
      </View>
    </View>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyView}>
      {isLoading ? (
        <ActivityIndicator color={COLORS.primary} />
      ) : (
        <Text style={styles.notificationDescrip}>
          {strings.notifications.noData}
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      {customHeader()}

      <SectionList
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        sections={sectionedNotifications || []}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={item => item?.notification_id}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ backgroundColor: COLORS.white }}>
            <Text style={styles.notificationHeader}>{title}</Text>
          </View>
        )}
      ></SectionList>
    </SafeAreaView>
  );
}
