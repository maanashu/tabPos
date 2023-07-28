import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { eventClockIcon, pin, chatIcon, crossButton, editIcon } from '@/assets';
import { styles } from '@/screens/Calender/Calender.styles';
import { ms } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import moment from 'moment';
import { calculateDuration } from '@/utils/GlobalMethods';
import ProfileImage from '@/components/ProfileImage';
import { changeAppointmentStatus, rescheduleAppointment } from '@/actions/AppointmentAction';
import { APPOINTMENT_STATUS } from '@/constants/status';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useState } from 'react';
import CustomAlert from '@/components/CustomAlert';
import { strings } from '@/localization';

const DATE_TIME_OPTION = {
  SELECTED_DATE_OPTION: 'SELECTED_DATE_OPTION',
  SELECTED_START_TIME_OPTION: 'SELECTED_START_TIME_OPTION',
  SELECTED_END_TIME_OPTION: 'SELECTED_END_TIME_OPTION',
};

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

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showRescheduleTimeModal, setshowRescheduleTimeModal] = useState(false);
  const [optionSelected, setoptionSelected] = useState('');

  const [rescheduleAppointmentDate, setRescheduleAppointmentDate] = useState('');
  const [rescheduleAppointmentStartTime, setRescheduleAppointmentStartTime] = useState('');
  const [rescheduleAppointmentEndTime, setRescheduleAppointmentEndTime] = useState('');

  const handleCancelAppointment = () => {
    const appointmentID = appointmentDetail?.appointment_id ?? '';
    dispatch(changeAppointmentStatus(appointmentID, APPOINTMENT_STATUS.REJECTED_BY_SELLER));
    clearDateTimeFromModal(); //clear date time states
    setshowRescheduleTimeModal(false);
    setshowEventDetailModal(false);
  };

  const clearDateTimeFromModal = () => {
    setRescheduleAppointmentDate('');
    setRescheduleAppointmentStartTime('');
    setRescheduleAppointmentEndTime('');
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

          <View
            style={{
              flexDirection: 'row',
              marginTop: ms(5),
              justifyContent: 'space-between',
            }}
          >
            <ProfileImage
              source={{ uri: userDetails?.profile_photo }}
              style={styles.customerUserProfile}
            />
            <View style={{ marginLeft: ms(6), flex: 1 }}>
              <Text style={styles.customerName}>
                {userDetails?.firstname + ' ' + userDetails?.lastname}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Image source={pin} style={styles.eventAddressIcon} />
                <Text style={styles.eventAddress}>{userAddress?.street_address}</Text>
              </View>
            </View>
            <View style={styles.EventDetailoptionsContainer}>
              <TouchableOpacity
                onPress={() => {
                  setshowRescheduleTimeModal(true);
                }}
              >
                <Image source={editIcon} style={styles.editOptionIcon} />
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
      <Modal isVisible={showRescheduleTimeModal}>
        <View style={styles.reschuduleModalContainer}>
          <Text style={styles.recheduleTitle}>Reschedule Appointment</Text>

          <TouchableOpacity
            onPress={() => {
              clearDateTimeFromModal(); //clear date time states
              setshowRescheduleTimeModal(false);
            }}
            style={styles.crossEventDetailModal}
          >
            <Image source={crossButton} style={styles.crossStl} />
          </TouchableOpacity>
          <View style={styles.rescheduleTimeContainer}>
            <View style={styles.rescheduleSubContainer}>
              <Text style={styles.rescheduleSelectTimetitle}>Select Date</Text>
              <TouchableOpacity
                style={styles.rescheduleTimeTextContainer}
                onPress={() => {
                  setShowDatePicker(true);
                  setoptionSelected(DATE_TIME_OPTION.SELECTED_DATE_OPTION);
                }}
              >
                <Text style={styles.rescheduleTimeText}>{`${
                  rescheduleAppointmentDate === ''
                    ? moment(completeData?.date).format('ll')
                    : rescheduleAppointmentDate
                }`}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rescheduleSubContainer}>
              <Text style={styles.rescheduleSelectTimetitle}>Select Start Time</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowTimePicker(true);
                  setoptionSelected(DATE_TIME_OPTION.SELECTED_START_TIME_OPTION);
                }}
                style={styles.rescheduleTimeTextContainer}
              >
                <Text style={styles.rescheduleTimeText}>{`${
                  rescheduleAppointmentStartTime === ''
                    ? completeData?.start_time
                    : rescheduleAppointmentStartTime
                }`}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rescheduleSubContainer}>
              <Text style={styles.rescheduleSelectTimetitle}>Select End Time</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowTimePicker(true);
                  setoptionSelected(DATE_TIME_OPTION.SELECTED_END_TIME_OPTION);
                }}
                style={styles.rescheduleTimeTextContainer}
              >
                <Text style={styles.rescheduleTimeText}>{`${
                  rescheduleAppointmentEndTime === ''
                    ? completeData?.end_time
                    : rescheduleAppointmentEndTime
                }`}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rescheduleBtnContainer}>
            <TouchableOpacity
              onPress={() => {
                const params = {
                  date:
                    rescheduleAppointmentDate === ''
                      ? moment(completeData?.date).format('YYYY-MM-DD')
                      : moment(rescheduleAppointmentDate).format('YYYY-MM-DD'),
                  start_time:
                    rescheduleAppointmentStartTime === ''
                      ? completeData?.start_time
                      : rescheduleAppointmentStartTime,
                  end_time:
                    rescheduleAppointmentEndTime === ''
                      ? completeData?.end_time
                      : rescheduleAppointmentEndTime,
                };

                const appointmentId = completeData?.id;
                dispatch(rescheduleAppointment(appointmentId, params));
                clearDateTimeFromModal(); //clear date time states
                setshowRescheduleTimeModal(false);
                setshowEventDetailModal(false);
              }}
              style={styles.rescheduleBtn}
            >
              <Text style={styles.rescheduleBtnText}>Reschedule</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.cancelAppointmentBtn}
            onPress={() => {
              CustomAlert({
                title: strings.calender.cancelAppointment,
                onYesPress: handleCancelAppointment,
              });
            }}
          >
            <Text style={styles.cancelAppointmentText}>Cancel Appointment</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            mode={'date'}
            minimumDate={new Date()}
            isVisible={showDatePicker}
            onConfirm={(date) => {
              const formattedDate = moment(date).format('LL');
              setRescheduleAppointmentDate(formattedDate);
              setShowDatePicker(false);
            }}
            onCancel={() => setShowDatePicker(false)}
          />

          <DateTimePickerModal
            mode={'time'}
            isVisible={showTimePicker}
            onConfirm={(date) => {
              const formattedTime = moment(date).format('hh:mm A');
              if (optionSelected === DATE_TIME_OPTION.SELECTED_START_TIME_OPTION) {
                setRescheduleAppointmentStartTime(formattedTime);
              } else if (optionSelected === DATE_TIME_OPTION.SELECTED_END_TIME_OPTION) {
                setRescheduleAppointmentEndTime(formattedTime);
              }
              setShowTimePicker(false);
            }}
            onCancel={() => setShowTimePicker(false)}
          />
        </View>
      </Modal>
    </Modal>
  );
};

export default EventDetailModal;
