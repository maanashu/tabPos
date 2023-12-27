import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { pin, eventClockIcon } from '@/assets';
import { ms } from 'react-native-size-matters';
import moment from 'moment';
import { changeAppointmentStatus } from '@/actions/AppointmentAction';
import { APPOINTMENT_STATUS } from '@/constants/status';
import { calculateDuration } from '@/utils/GlobalMethods';
import { useDispatch } from 'react-redux';
import ProfileImage from '@/components/ProfileImage';
import { styles } from '../styles';

moment.suppressDeprecationWarnings = true;

const EventItemCard = ({ item, index }) => {
  const dispatch = useDispatch();
  const userDetails = item?.user_details;
  const userAddress = userDetails?.current_address;
  const appointmentDetail = item;

  return (
    <View style={styles.eventItemContainer}>
      {userDetails && (
        <View style={styles.customerDetailContainer}>
          <Text style={styles._eventTitle}>Customer:</Text>

          <View style={{ flexDirection: 'row', marginTop: ms(5) }}>
            <ProfileImage
              source={{ uri: userDetails?.profile_photo }}
              style={styles.customerUserProfile}
            />
            <View style={{ marginLeft: ms(6) }}>
              <Text style={styles.customerName}>
                {userDetails?.firstname + ' ' + userDetails?.lastname}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={pin} style={styles.eventAddressIcon} />
                <Text style={[styles.eventAddress, { width: '90%', paddingHorizontal: ms(5) }]}>
                  {userAddress?.street_address}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
      <View style={[{ marginHorizontal: ms(10) }, !userDetails && { marginTop: ms(5) }]}>
        <Text style={styles._eventTitle}>Service Requested:</Text>
        <Text style={styles.hairCutTitle}>{appointmentDetail?.product_name}</Text>
      </View>
      <View style={styles.subContainer1}>
        <Text style={styles._eventTitle}>Service Time:</Text>
        <View style={styles.serviceTimeContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={eventClockIcon} style={styles.evenclockIcon} />
            <Text style={styles.eventDay}>{moment.utc(item.date).format('ddd')}</Text>
          </View>
          <View style={styles.lineStl} />

          <Text style={styles.eventDate}>{moment.utc(item.date).format('ll')}</Text>

          <View style={styles.lineStl} />
          <Text style={styles.eventDate}>
            {item.start_time}
            {'-'}
            {item.end_time}
          </Text>
        </View>
      </View>
      <View style={styles.duractionContainer}>
        <Text style={styles._eventTitle}>Duration:</Text>
        <Text style={styles.duractiontxt}>{calculateDuration(item.start_time, item.end_time)}</Text>
      </View>

      <View style={{ marginTop: ms(15), marginHorizontal: ms(10) }}>
        <Text style={styles._eventTitle}>Service Charge:</Text>
        <View style={styles.serviceChargeSub}>
          <Text style={styles.totalTile}>Total</Text>
          <Text style={styles.totalTile}>
            {item?.mode_of_payment?.toUpperCase() === 'JBR'
              ? item?.mode_of_payment?.toUpperCase() + ' '
              : '$'}

            {`${parseFloat(item?.price).toFixed(2)}`}
          </Text>
        </View>
      </View>
      <View style={styles.paidContainer}>
        <Text style={styles.paidText}>Paid</Text>
      </View>

      <View style={styles._btnContainer}>
        <TouchableOpacity
          onPress={() => {
            const appointmentID = item?.id ?? '';
            dispatch(changeAppointmentStatus(appointmentID, APPOINTMENT_STATUS.REJECTED_BY_SELLER));
          }}
          style={styles.declineBtnContainer}
        >
          <Text style={styles.declineText}>Decline</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            const appointmentID = item?.id ?? '';
            dispatch(changeAppointmentStatus(appointmentID, APPOINTMENT_STATUS.ACCEPTED_BY_SELLER));
          }}
          style={styles.acceptbtnContainer}
        >
          <Text style={styles.approveText}>Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventItemCard;
