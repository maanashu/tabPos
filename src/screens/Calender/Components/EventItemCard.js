import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { pin, eventClockIcon, clock } from '@/assets';
import { styles } from '@/screens/Calender/Calender.styles';
import { ms } from 'react-native-size-matters';
import moment from 'moment';
import { changeAppointmentStatus } from '@/actions/AppointmentAction';
import { APPOINTMENT_STATUS } from '@/constants/status';
import { calculateDuration, calculateTimeDuration } from '@/utils/GlobalMethods';
import { useDispatch } from 'react-redux';
import ProfileImage from '@/components/ProfileImage';
import { Images } from '@/assets/new_icon';
import { Spacer } from '@/components';
import { COLORS } from '@/theme';

moment.suppressDeprecationWarnings = true;

const EventItemCard = ({ item, index }) => {
  const dispatch = useDispatch();
  const userDetails = item?.user_details;
  const userAddress = userDetails?.current_address;
  const appointmentDetail = item;

  return (
    <View
      style={[
        styles.eventItemContainer,
        {
          backgroundColor:
            item?.mode_of_payment == 'cash' ? COLORS.sky_grey : COLORS.alarm_success_50,
          borderColor: item?.mode_of_payment == 'cash' ? COLORS.light_purple : COLORS.success_green,
        },
      ]}
    >
      {userDetails && (
        <View style={styles.customerDetailContainer}>
          <View style={styles.rowAlignedJustified}>
            <Text style={styles._eventTitle}>Customer:</Text>
            <View
              style={[
                styles.paidContainer,
                {
                  backgroundColor:
                    item?.mode_of_payment == 'cash' ? COLORS.white : COLORS.success_green,
                },
              ]}
            >
              <Text
                style={[
                  styles.paidText,
                  {
                    color: item?.mode_of_payment == 'cash' ? COLORS.navy_blue : COLORS.white,
                  },
                ]}
              >
                {item?.mode_of_payment == 'cash' ? 'Unpaid' : 'Paid'}
              </Text>
              {item?.mode_of_payment != 'cash' && (
                <>
                  <Spacer horizontal space={ms(3)} />
                  <Image
                    source={Images.check_circle}
                    resizeMode="contain"
                    style={styles.checkStyle}
                  />
                </>
              )}
            </View>
          </View>

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
                <Text style={styles.eventAddress}>{userAddress?.street_address}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
      <View style={[styles.requestedServicesView, { marginTop: ms(1) }]}>
        <Text style={styles.servicesRequested}>Services requested:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginLeft: ms(5) }}>
          <View style={styles.rowAligned}>
            {/* {[0, 1, 2, 3, 4, 5].map((item, index) => ( */}
            <View style={styles.scrollableServicesView}>
              <Text style={styles.servicesName}>{item?.product_name}</Text>
            </View>
            {/* ))} */}
          </View>
        </ScrollView>
      </View>

      {/* <View style={styles.subContainer1}>
        <Text style={styles._eventTitle}>Service Time:</Text>
        <View style={styles.serviceTimeContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={eventClockIcon} style={styles.evenclockIcon} />
            <Text style={styles.eventDay}>{moment(item.date).format('ddd')}</Text>
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
      </View> */}
      <View style={styles.serviceTimeView}>
        <Text style={styles.servicesRequested}>Service Time</Text>

        <Spacer space={ms(8)} />
        <View style={styles.rowAligned}>
          <View style={styles.rowAligned}>
            <Image
              style={styles.serviceTimeIcons}
              resizeMode="contain"
              source={Images.calendarIcon}
            />
            <Text style={styles.serviceTimeTextSmall}>
              {moment(item?.start_date_time).format('dddd, DD/MM/YYYY')}
            </Text>
          </View>
          <Spacer horizontal space={ms(10)} />
          <View style={styles.rowAligned}>
            <Image source={clock} style={styles.serviceTimeIcons} resizeMode="contain" />
            <Text style={styles.serviceTimeTextSmall}>{calculateTimeDuration(item)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.dashedLine} />

      <View style={[styles.rowAlignedJustified, { marginBottom: ms(10) }]}>
        <View style={[styles.serviceChargeSub, { flex: 0.5 }]}>
          <Text style={styles.totalTile}>Total</Text>
          <Text style={styles.totalTile}>
            {/* {item?.mode_of_payment?.toUpperCase() === 'JBR'
              ? item?.mode_of_payment?.toUpperCase() + ' '
              : '$'} */}

            {`$ ${parseFloat(item?.price).toFixed(2)}`}
          </Text>
        </View>

        <View style={[styles._btnContainer, { flex: 1 }]}>
          <TouchableOpacity
            onPress={() => {
              const appointmentID = item?.id ?? '';
              dispatch(
                changeAppointmentStatus(appointmentID, APPOINTMENT_STATUS.REJECTED_BY_SELLER)
              );
            }}
            style={[
              styles.declineButtonStyle,
              { height: ms(30), width: '46%', backgroundColor: 'transparent' },
            ]}
          >
            <Text style={styles.declineText}>Decline</Text>
          </TouchableOpacity>
          <Spacer horizontal space={ms(10)} />

          <TouchableOpacity
            onPress={() => {
              const appointmentID = item?.id ?? '';
              dispatch(
                changeAppointmentStatus(appointmentID, APPOINTMENT_STATUS.ACCEPTED_BY_SELLER)
              );
            }}
            style={[styles.acceptButtonStyle, { height: ms(30), width: '46%' }]}
          >
            <Text style={styles.approveText}>Accept</Text>
            <Image style={styles.rightArrowStyle} source={Images.arrowUpRightIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EventItemCard;
