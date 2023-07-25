import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { eventClockIcon, pin, chatIcon, crossButton, editIcon, cancleIc } from '@/assets';
import { styles } from '@/screens/Calender/Calender.styles';
import { ms } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import moment from 'moment';
import { calculateDuration } from '@/utils/GlobalMethods';
import ProfileImage from '@/components/ProfileImage';
import { changeAppointmentStatus } from '@/actions/AppointmentAction';
import { APPOINTMENT_STATUS } from '@/constants/status';

const EventDetailModal = ({
  showEventDetailModal,
  setshowEventDetailModal,
  eventData,
  dispatch,
}) => {
  const { completeData } = eventData;
  const userDetails = completeData?.user_details;
  const userAddress = userDetails?.current_address;
  const appointmentDetail = completeData?.appointment_details[0];
  const posUserDetails = completeData?.pos_user_details?.user?.user_profiles;
  const posUserRole = completeData?.pos_user_details?.user?.user_roles[0]?.role?.name || 'NULL';

  const handleCancelAppointment = () => {
    const appointmentID = appointmentDetail?.appointment_id ?? '';
    dispatch(changeAppointmentStatus(appointmentID, APPOINTMENT_STATUS.REJECTED_BY_SELLER));
    setshowEventDetailModal(false);
  };

  return (
    <Modal isVisible={showEventDetailModal}>
      <View style={styles.eventDetailModalContainer}>
        <TouchableOpacity
          onPress={() => setshowEventDetailModal(false)}
          style={styles.crossEventDetailModal}
        >
          <Image source={crossButton} style={styles.crossStl} />
        </TouchableOpacity>
        <View style={[styles.customerDetailContainer, { marginTop: ms(15) }]}>
          <Text style={styles._eventTitle}>Customer:</Text>

          <View style={{ flexDirection: 'row', marginTop: ms(5) }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
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
            </View>
            <View
              style={{
                height: ms(20),
                flexDirection: 'row',
                marginRight: ms(5),
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Do you want to cancel this appointment',
                    '',
                    [
                      {
                        text: 'No',
                        style: 'cancel',
                      },
                      {
                        text: 'Yes',
                        onPress: handleCancelAppointment,
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <Image
                  source={cancleIc}
                  style={{
                    height: ms(12),
                    width: ms(12),
                    resizeMode: 'contain',
                    marginRight: ms(7),
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  alert('edit coming soon');
                }}
              >
                <Image
                  source={editIcon}
                  style={{
                    height: ms(10),
                    width: ms(10),
                    resizeMode: 'contain',
                    marginRight: ms(5),
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  alert('message coming soon');
                }}
              >
                <Image source={chatIcon} style={styles.chatIconStl} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.assignedContainer}>
          <Text style={styles._eventTitle}>Assigned:</Text>

          <View style={{ flexDirection: 'row', marginTop: ms(5) }}>
            <ProfileImage
              source={{ uri: posUserDetails?.profile_photo }}
              style={styles.customerUserProfile}
            />
            <View style={{ marginLeft: ms(6) }}>
              <Text style={styles.customerName}>
                {posUserDetails?.firstname + ' ' + posUserDetails?.lastname}
              </Text>
              <Text style={styles.eventAddress}>{posUserRole}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginHorizontal: ms(15) }}>
          <Text style={styles._eventTitle}>Service Requested:</Text>
          <Text style={styles.hairCutTitle}>{appointmentDetail?.product_name}</Text>
        </View>
        <View style={[styles.subContainer1, { marginLeft: ms(15) }]}>
          <Text style={styles._eventTitle}>Service Time:</Text>
          <View style={styles.serviceTimeContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={eventClockIcon} style={styles.evenclockIcon} />
              <Text style={styles.eventDay}>{moment(completeData?.date).format('dddd')}</Text>
            </View>
            <View style={styles.lineStl} />

            <Text style={styles.eventDate}>{moment(completeData?.date).format('ll')}</Text>

            <View style={styles.lineStl} />
            <Text style={styles.eventDate}>
              {completeData?.start_time}
              {'-'}
              {completeData?.end_time}
            </Text>
          </View>
        </View>
        <View style={[styles.duractionContainer, { marginLeft: ms(15) }]}>
          <Text style={styles._eventTitle}>Duration:</Text>
          <Text style={styles.duractiontxt}>
            {calculateDuration(completeData?.start_time, completeData?.end_time)}
          </Text>
        </View>

        <View style={styles.amountSliptContainer}>
          <Text style={[styles._eventTitle, { marginBottom: ms(2) }]}>Service Charge:</Text>
          <View style={styles.subtotalContainers}>
            <Text style={styles._eventTitle}>Sub Total</Text>
            <Text style={styles._eventTitle}>${completeData?.actual_amount}</Text>
          </View>
          <View style={styles.subtotalContainers}>
            <Text style={styles._eventTitle}>Discount</Text>
            <Text style={styles._eventTitle}>${completeData?.discount}</Text>
          </View>
          <View style={styles.subtotalContainers}>
            <Text style={styles._eventTitle}>Taxes</Text>
            <Text style={styles._eventTitle}>${completeData?.tax}</Text>
          </View>
          <View style={styles.subtotalContainers}>
            <Text style={styles._eventTitle}>Tips</Text>
            <Text style={styles._eventTitle}>${completeData?.tips}</Text>
          </View>
          <View style={styles.serviceChargeSub}>
            <Text style={styles.totalTile}>Total</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.paidContainer}>
                <Text style={styles.paidText}>Paid</Text>
              </View>
              <Text style={styles.totalTile}>{completeData?.payable_amount}</Text>
            </View>
          </View>
          <Text style={styles.invoiceTxt}>Invoice # V364899978</Text>
        </View>
      </View>
    </Modal>
  );
};

export default EventDetailModal;
