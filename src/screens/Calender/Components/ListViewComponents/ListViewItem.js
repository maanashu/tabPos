import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ProfileImage from '@/components/ProfileImage';
import { styles } from '../../Calender.styles';
import { Button, Spacer } from '@/components';
import { memo } from 'react';
import { ms } from 'react-native-size-matters';
import { Fonts, editIcon, pin } from '@/assets';
import { COLORS } from '@/theme';
import { getCalendarActionButtonTitle } from '@/utils/GlobalMethods';
import { APPOINTMENT_STATUS } from '@/constants/status';
import { changeAppointmentStatus } from '@/actions/AppointmentAction';
import { useDispatch } from 'react-redux';

const ListViewItem = ({
  item,
  index,
  onPressCheckin,
  onPressEdit,
  onPressMarkComplete,
  isChangeStatusLoading,
  isSendCheckinOTPLoading,
}) => {
  const userDetails = item?.user_details;
  const invitedUserDetails = item?.invitation_details;
  const userId = item?.user_id;
  const customerDetails = userId != null ? userDetails : invitedUserDetails;
  const userAddress = userDetails?.current_address;
  const posUserDetails = item?.pos_user_details?.user?.user_profiles;
  const dispatch = useDispatch();
  const appointmentID = item.appointment_details[0]?.appointment_id;

  const renderButtons = {
    [APPOINTMENT_STATUS.REVIEWING]: (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button
          pending={isChangeStatusLoading}
          title={'Decline'}
          textStyle={styles.listCheckinBtnText}
          style={[styles.listViewCheckinBtn, { paddingHorizontal: ms(5) }]}
          onPress={() => {
            dispatch(changeAppointmentStatus(appointmentID, APPOINTMENT_STATUS.REJECTED_BY_SELLER));
          }}
        />
        <Spacer space={ms(4)} horizontal />
        <Button
          pending={isChangeStatusLoading}
          title={'Approve'}
          textStyle={[styles.listCheckinBtnText, { color: COLORS.white }]}
          style={[
            styles.listViewCheckinBtn,
            { paddingHorizontal: ms(5), backgroundColor: COLORS.primary },
          ]}
          onPress={() => {
            dispatch(changeAppointmentStatus(appointmentID, APPOINTMENT_STATUS.ACCEPTED_BY_SELLER));
          }}
        />
      </View>
    ),
    [APPOINTMENT_STATUS.ACCEPTED_BY_SELLER]: (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button
          pending={isChangeStatusLoading}
          title={'Check-in'}
          textStyle={styles.listCheckinBtnText}
          style={styles.listViewCheckinBtn}
          onPress={() => onPressCheckin(item)}
        />
        <TouchableOpacity style={styles.listViewEditBtn} onPress={() => onPressEdit(item)}>
          <Image source={editIcon} style={styles.listViewEditIcon} />
        </TouchableOpacity>
      </View>
    ),
    [APPOINTMENT_STATUS.CHECKED_IN]: (
      <Button
        pending={isChangeStatusLoading}
        title={getCalendarActionButtonTitle(item?.status)}
        textStyle={[styles.listCheckinBtnText, { color: COLORS.white }]}
        style={[
          styles.listViewCheckinBtn,
          {
            backgroundColor: COLORS.primary,
          },
        ]}
        onPress={() => onPressMarkComplete(item)}
      />
    ),
    [APPOINTMENT_STATUS.COMPLETED]: (
      <Button
        pending={isChangeStatusLoading}
        disabled
        title={getCalendarActionButtonTitle(item?.status)}
        textStyle={[styles.listCheckinBtnText, { color: COLORS.white }]}
        style={[
          styles.listViewCheckinBtn,
          {
            backgroundColor: COLORS.darkGray,
            borderWidth: 0,
          },
        ]}
      />
    ),
    [APPOINTMENT_STATUS.CANCELLED_BY_CUSTOMER]: (
      <Button
        pending={isChangeStatusLoading}
        disabled
        title={getCalendarActionButtonTitle(item?.status)}
        textStyle={[styles.listCheckinBtnText, { color: COLORS.white }]}
        style={[
          styles.listViewCheckinBtn,
          {
            backgroundColor: COLORS.darkGray,
            borderWidth: 0,
          },
        ]}
      />
    ),
    [APPOINTMENT_STATUS.REJECTED_BY_SELLER]: (
      <Button
        pending={isChangeStatusLoading}
        disabled
        title={getCalendarActionButtonTitle(item?.status)}
        textStyle={[styles.listCheckinBtnText, { color: COLORS.white }]}
        style={[
          styles.listViewCheckinBtn,
          {
            backgroundColor: COLORS.darkGray,
            borderWidth: 0,
          },
        ]}
      />
    ),
  };

  return (
    <>
      <View style={[styles.LlistViewHeaderContainer, { marginVertical: ms(5) }]}>
        <View style={[styles.listViewSubContainers, { flex: 0.3, justifyContent: 'flex-start' }]}>
          {userDetails || invitedUserDetails ? (
            <>
              <ProfileImage
                source={{ uri: customerDetails?.profile_photo }}
                style={styles.customerUserProfile}
              />
              <View style={{ marginLeft: ms(6), flex: 1 }}>
                <Text style={styles.customerName}>
                  {customerDetails?.firstname + ' ' + customerDetails?.lastname}
                </Text>
                {userId !== null && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={pin} style={styles.eventAddressIcon} />
                    <Text style={styles.eventAddress}>{userAddress?.street_address}</Text>
                  </View>
                )}
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
        <View style={styles.listViewSubContainers}>{renderButtons[item?.status]}</View>
      </View>
      <View style={styles.deviderList} />
    </>
  );
};

export default memo(ListViewItem);
