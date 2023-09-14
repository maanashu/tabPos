import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ProfileImage from '@/components/ProfileImage';
import { styles } from '../../Calender.styles';
import { Button } from '@/components';
import { memo } from 'react';
import { ms } from 'react-native-size-matters';
import { Fonts, editIcon } from '@/assets';

const ListViewItem = ({
  item,
  index,
  onPressCheckin,
  onPressEdit,
  onPressMarkComplete,
  isBookingCompletedLoading,
  isSendCheckinOTPLoading,
}) => {
  const userDetails = item?.user_details;
  const userAddress = userDetails?.current_address;
  const posUserDetails = item?.pos_user_details?.user?.user_profiles;

  return (
    <>
      <View style={[styles.LlistViewHeaderContainer, { marginVertical: ms(5) }]}>
        <View style={[styles.listViewSubContainers, { flex: 0.3, justifyContent: 'flex-start' }]}>
          {userDetails ? (
            <>
              <ProfileImage
                source={{ uri: userDetails?.profile_photo }}
                style={styles.customerUserProfile}
              />
              <View style={{ marginLeft: ms(6), flex: 1 }}>
                <Text style={styles.customerName}>
                  {userDetails?.firstname + ' ' + userDetails?.lastname}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={pin} style={styles.eventAddressIcon} />
                  <Text style={styles.eventAddress}>{userAddress?.street_address}</Text>
                </View>
              </View>
            </>
          ) : (
            <Text style={{ fontFamily: Fonts.Regular, fontSize: ms(9) }}>No Customer</Text>
          )}
        </View>

        <View style={styles.listViewSubContainers}>
          <Text style={styles.lineViewValues}>
            {posUserDetails?.firstname + ' ' + posUserDetails?.lastname}
          </Text>
        </View>
        <View style={styles.listViewSubContainers}>
          <Text style={styles.lineViewValues}>{item?.appointment_details[0]?.product_name}</Text>
        </View>
        <View style={styles.listViewSubContainers}>
          <Text style={styles.lineViewValues}>{`${item?.start_time}-${item?.end_time}`}</Text>
        </View>
        <View style={styles.listViewSubContainers}>
          {item?.status === 1 ? (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                pending={isSendCheckinOTPLoading}
                title={'Check-in'}
                textStyle={styles.listCheckinBtnText}
                style={styles.listViewCheckinBtn}
                onPress={() => onPressCheckin(item)}
              />
              <TouchableOpacity style={styles.listViewEditBtn} onPress={() => onPressEdit(item)}>
                <Image source={editIcon} style={styles.listViewEditIcon} />
              </TouchableOpacity>
            </View>
          ) : (
            <Button
              pending={isBookingCompletedLoading}
              title={'Mark Complete'}
              textStyle={[styles.listCheckinBtnText, { color: COLORS.white }]}
              style={[styles.listViewCheckinBtn, { backgroundColor: COLORS.primary }]}
              onPress={() => onPressMarkComplete(item)}
            />
          )}
        </View>
      </View>
      <View style={styles.deviderList} />
    </>
  );
};

export default memo(ListViewItem);
