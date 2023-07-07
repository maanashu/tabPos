import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { pin, eventClockIcon } from '@/assets';
import { styles } from '@/screens/Calender/Calender.styles';
import { ms } from 'react-native-size-matters';
import moment from 'moment';
import { changeAppointmentStatus } from '@/actions/AppointmentAction';
import { APPOINTMENT_STATUS } from '@/constants/status';
import { calculateDuration } from '@/utils/GlobalMethods';

const EventItemCard = ({ item, index }) => {
  const userDetails = item?.user_details;
  const userAddress = userDetails?.current_address;
  const appointmentDetail = item?.appointment_details[0];
  return (
    <View style={styles.eventItemContainer}>
      <View style={styles.customerDetailContainer}>
        <Text style={styles._eventTitle}>Customer:</Text>

        <View style={{ flexDirection: 'row', marginTop: ms(5) }}>
          <Image
            source={{
              uri: 'https://xsgames.co/randomusers/avatar.php?g=male',
            }}
            style={styles.customerUserProfile}
          />
          <View style={{ marginLeft: ms(6) }}>
            <Text style={styles.customerName}>
              {userDetails.firstname + ' ' + userDetails.lastname}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={pin} style={styles.eventAddressIcon} />
              <Text style={styles.eventAddress}>
                {userAddress.street_address}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ marginHorizontal: ms(10) }}>
        <Text style={styles._eventTitle}>Service Requested:</Text>
        <Text style={styles.hairCutTitle}>
          {appointmentDetail.product_name}
        </Text>
      </View>
      <View style={styles.subContainer1}>
        <Text style={styles._eventTitle}>Service Time:</Text>
        <View style={styles.serviceTimeContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={eventClockIcon} style={styles.evenclockIcon} />
            <Text style={styles.eventDay}>
              {moment(item.date).format('dddd')}
            </Text>
          </View>
          <View style={styles.lineStl} />

          <Text style={styles.eventDate}>{moment(item.date).format('ll')}</Text>

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
        <Text style={styles.duractiontxt}>
          {calculateDuration(item.start_time, item.end_time)}
        </Text>
      </View>

      <View style={{ marginTop: ms(15), marginHorizontal: ms(10) }}>
        <Text style={styles._eventTitle}>Service Charge:</Text>
        <View style={styles.serviceChargeSub}>
          <Text style={styles.totalTile}>Total</Text>
          <Text style={styles.totalTile}>
            {item?.mode_of_payment.toUpperCase() === 'JBR'
              ? item?.mode_of_payment.toUpperCase() + ' '
              : '$'}

            {item?.payable_amount}
          </Text>
        </View>
      </View>
      <View style={styles.paidContainer}>
        <Text style={styles.paidText}>Paid</Text>
      </View>

      <View style={styles._btnContainer}>
        {item?.status !== 1 && (
          <TouchableOpacity
            onPress={() => {
              const appointmentID =
                item.appointment_details[0]?.appointment_id ?? '';

              dispatch(
                changeAppointmentStatus(
                  appointmentID,
                  APPOINTMENT_STATUS.REJECTED_BY_SELLER
                )
              );
            }}
            style={styles.declineBtnContainer}
          >
            <Text style={styles.declineText}>Decline</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          disabled={item?.status === 1}
          onPress={() => {
            const appointmentID =
              item.appointment_details[0]?.appointment_id ?? '';

            dispatch(
              changeAppointmentStatus(
                appointmentID,
                APPOINTMENT_STATUS.ACCEPTED_BY_SELLER
              )
            );
          }}
          style={[
            styles.acceptbtnContainer,
            // { backgroundColor: item?.status === 1 ? 'green' : COLORS.primary },
          ]}
        >
          <Text style={styles.approveText}>
            {item?.status === 1 ? 'Approved' : 'Approve'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventItemCard;
