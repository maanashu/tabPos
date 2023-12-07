import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ProfileImage from '@/components/ProfileImage';
import { styles } from '../../Calender.styles';
import { Button, Spacer } from '@/components';
import { memo } from 'react';
import { ms } from 'react-native-size-matters';
import {
  Fonts,
  arrowLeftUp,
  arrowRightIcon,
  checkInIcon,
  circleTick,
  editAppointmentIcon,
  editIcon,
  new_location,
  pin,
  timeDurationIcon,
} from '@/assets';
import { COLORS } from '@/theme';
import { getCalendarActionButtonTitle } from '@/utils/GlobalMethods';
import { APPOINTMENT_STATUS } from '@/constants/status';
import { changeAppointmentStatus } from '@/actions/AppointmentAction';
import { useDispatch } from 'react-redux';
import { ButtonIcon } from '@/components/ButtonIcon';

const ListViewItem = ({
  item,
  index,
  onPressCheckin,
  onPressEdit,
  onPressMarkComplete,
  isChangeStatusLoading,
  isSendCheckinOTPLoading,
  onPressAccept = () => {},
  onPressReject = () => {},
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
      <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
        <Button
          pending={isChangeStatusLoading}
          title={'Decline'}
          textStyle={[styles.listCheckinBtnText, { color: COLORS.navy_blue }]}
          style={[
            styles.listViewCheckinBtn,
            {
              paddingHorizontal: ms(5),
              borderColor: COLORS.navy_blue,
              borderRadius: ms(15),
              width: '47%',
            },
          ]}
          onPress={async () => {
            await dispatch(
              changeAppointmentStatus(appointmentID, APPOINTMENT_STATUS.REJECTED_BY_SELLER)
            );
            onPressReject && onPressReject();
          }}
        />
        <Spacer space={ms(4)} horizontal />
        <ButtonIcon
          iconPostion="right"
          icon={arrowLeftUp}
          iconStyle={{
            height: ms(8),
            width: ms(8),
            tintColor: COLORS.sky_blue,
            transform: [{ rotate: '90deg' }],
          }}
          pending={isChangeStatusLoading}
          title={'Accept'}
          textStyle={[styles.listCheckinBtnText, { color: COLORS.white, paddingHorizontal: ms(2) }]}
          style={[
            styles.listViewCheckinBtn,
            {
              height: ms(24),
              paddingHorizontal: ms(5),
              backgroundColor: COLORS.navy_blue,
              borderRadius: ms(15),
              marginHorizontal: 0,
              width: '47%',
            },
          ]}
          onPress={async () => {
            await dispatch(
              changeAppointmentStatus(appointmentID, APPOINTMENT_STATUS.ACCEPTED_BY_SELLER)
            );
            onPressAccept && onPressAccept();
          }}
        />
      </View>
    ),
    [APPOINTMENT_STATUS.ACCEPTED_BY_SELLER]: (
      <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
        <ButtonIcon
          iconPostion="right"
          icon={checkInIcon}
          iconStyle={{
            height: ms(8),
            width: ms(8),
          }}
          pending={isChangeStatusLoading}
          title={'Check-in'}
          textStyle={[
            styles.listCheckinBtnText,
            { color: COLORS.navy_blue, paddingHorizontal: ms(2) },
          ]}
          style={[
            styles.listViewCheckinBtn,
            {
              height: ms(26),
              paddingHorizontal: ms(5),
              backgroundColor: COLORS.sky_grey,
              borderRadius: ms(13),
              marginHorizontal: 0,
              width: '65%',
              borderWidth: 0,
            },
          ]}
          onPress={() => onPressCheckin(item)}
        />
        <TouchableOpacity style={styles.listViewEditBtn} onPress={() => onPressEdit(item)}>
          <Image source={editAppointmentIcon} style={styles.listViewEditIcon} />
        </TouchableOpacity>
      </View>
    ),
    [APPOINTMENT_STATUS.CHECKED_IN]: (
      <Button
        pending={isChangeStatusLoading}
        title={getCalendarActionButtonTitle(item?.status)}
        textStyle={[styles.listCheckinBtnText, { color: COLORS.navy_blue }]}
        style={[
          styles.listViewCheckinBtn,
          {
            backgroundColor: COLORS.sky_grey,
            borderWidth: 0,
            borderRadius: ms(15),
          },
        ]}
        onPress={() => onPressMarkComplete(item)}
      />
    ),
    [APPOINTMENT_STATUS.COMPLETED]: (
      <ButtonIcon
        iconPostion="right"
        disabled
        icon={circleTick}
        iconStyle={{
          height: ms(8),
          width: ms(8),
        }}
        pending={isChangeStatusLoading}
        title={'Completed'}
        textStyle={[styles.listCheckinBtnText, { color: COLORS.white, paddingHorizontal: ms(2) }]}
        style={[
          styles.listViewCheckinBtn,
          {
            height: ms(26),
            paddingHorizontal: ms(8),
            backgroundColor: COLORS.success_green,
            borderRadius: ms(15),
            marginHorizontal: 0,
            borderWidth: 0,
            width: '98%',
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
            borderRadius: ms(15),
            height: ms(26),
            width: '98%',
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
            borderRadius: ms(15),
            height: ms(26),
            width: '98%',
          },
        ]}
      />
    ),
  };

  return (
    <>
      <View
        key={index}
        style={[
          styles.LlistViewHeaderContainer,
          styles._listViewItemContainer2,
          {
            borderColor:
              item?.status == APPOINTMENT_STATUS.COMPLETED ? COLORS.light_purple : COLORS.sky_grey,
          },
        ]}
      >
        <View style={[styles.listViewSubContainers, { flex: 0.2, justifyContent: 'flex-start' }]}>
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
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: ms(2) }}>
                  {/* <Image source={new_location} style={styles.eventAddressIcon} /> */}
                  <Text style={styles.eventAddress}>
                    {userId !== null
                      ? customerDetails?.phone_number
                      : customerDetails?.phone_code + customerDetails?.phone_no}
                  </Text>
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
          <Image
            source={timeDurationIcon}
            style={{ height: ms(10), width: ms(10), marginRight: ms(2) }}
          />
          <Text style={styles.lineViewValues}>{`${item?.start_time}-${item?.end_time}`}</Text>
        </View>
        <View style={[styles.listViewSubContainers, { backgroundColor: 'transparent' }]}>
          {renderButtons[item?.status]}
        </View>
      </View>
      {/* <View style={styles.deviderList} /> */}
    </>
  );
};

export default memo(ListViewItem);
