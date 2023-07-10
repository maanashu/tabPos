import { fetchAllNotifications } from '@/actions/SettingAction';
import {
  backArrow,
  blankCheckBox,
  cash,
  settingsIcon,
  userImage,
  wallet,
} from '@/assets';
import { strings } from '@/localization';
import { goBack } from '@/navigation/NavigationRef';
import { getSetting } from '@/selectors/SettingSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { COLORS } from '@/theme';
import { TYPES } from '@/Types/SettingTypes';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CustomHeader } from '../PosRetail/Components';
import { styles } from './styles';

export default function NotificationsList() {
  const dispatch = useDispatch();
  const notifications = useSelector(getSetting)?.notifications;
  console.log('notifications-----', notifications);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchAllNotifications());
  }, []);

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.FETCH_ALL_NOTIFICATIONS], state)
  );

  const sectionedNotifications = useMemo(() => {
    return notifications?.reduce((acc, curr) => {
      const date = moment(curr?.created_at).format('MMMM DD, YYYY');
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
            <Image style={styles.notificationImg} source={userImage} />
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
      return <Image style={styles.notificationImg} source={blankCheckBox} />;
    } else {
      return (
        <Image
          style={styles.notificationImg}
          source={
            item?.notification?.user_image
              ? { uri: item?.notification?.user_image }
              : userImage
          }
        />
      );
    }
  };

  const customHeader = () => (
    <View style={styles.headerMainView}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => goBack()}
        style={styles.backViewStyle}
      >
        <Image source={backArrow} style={styles.backIconStyle} />
        <Text style={styles.headerTitle}>{strings.notifications.header}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      {customHeader()}

      <SectionList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item?.notification_id}
        sections={sectionedNotifications || []}
        ListEmptyComponent={() => (
          <View style={styles.emptyView}>
            {isLoading ? (
              <ActivityIndicator color={COLORS.primary} />
            ) : (
              <Text style={styles.notificationDescrip}>
                {strings.notifications.noData}
              </Text>
            )}
          </View>
        )}
        renderItem={({ item }) => {
          console.log('item----', item);
          return (
            <TouchableOpacity
              //   onPress={() => openNotificationHandler(item)}
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
            </TouchableOpacity>
          );
        }}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ backgroundColor: COLORS.white }}>
            <Text style={styles.notificationHeader}>{title}</Text>
          </View>
        )}
      ></SectionList>
    </SafeAreaView>
  );
}
