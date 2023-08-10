import React, { useState } from 'react';
import { Dimensions, Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { COLORS, SF, SH, SW } from '@/theme';
import { Spacer } from '@/components';
import { crossButton, Fonts, userImage } from '@/assets';
import { getRetail } from '@/selectors/RetailSelectors';

import { getTimeSlots } from '@/actions/RetailAction';
import MonthYearPicker, { DATE_TYPE } from '../../../components/MonthYearPicker';
import { useEffect } from 'react';
import moment from 'moment';
import Modal from 'react-native-modal';
import { styles } from '../Calender.styles';
import { getDaysAndDates } from '@/utils/GlobalMethods';
import CustomAlert from '@/components/CustomAlert';
import { strings } from '@/localization';
import { changeAppointmentStatus, rescheduleAppointment } from '@/actions/AppointmentAction';
import { APPOINTMENT_STATUS } from '@/constants/status';
import { getAuthData } from '@/selectors/AuthSelector';

const windowWidth = Dimensions.get('window').width;

export function ReScheduleDetailModal({
  showRecheduleModal,
  setShowRescheduleModal,
  appointmentData,
  setshowEventDetailModal,
}) {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const timeSlotsData = getRetailData?.timeSlots;
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const appointmentDetail = appointmentData?.appointment_details[0];
  const posUserDetails = appointmentData?.pos_user_details;
  const posUserId = posUserDetails?.user?.unique_uuid;

  const [selectedTimeSlotIndex, setselectedTimeSlotIndex] = useState(null);
  const [selectedTimeSlotData, setSelectedTimeSlotData] = useState('');
  const [selectedDate, setselectedDate] = useState(
    moment(appointmentData?.date).format('MM/DD/YY')
  );

  const [selectedMonthData, setselectedMonthData] = useState(null);
  const [selectedYearData, setselectedYearData] = useState(null);

  const [monthDays, setmonthDays] = useState([]);

  useEffect(() => {
    const params = {
      seller_id: sellerID,
      product_id: appointmentDetail?.product_id,
      date: moment(selectedDate).format('YYYY-MM-DD'),
      pos_user_id: posUserId,
    };
    dispatch(getTimeSlots(params));
  }, [posUserId, selectedDate]);

  useEffect(() => {
    const daysArray = getDaysAndDates(selectedYearData?.value, selectedMonthData?.value);
    setmonthDays(daysArray);
  }, [selectedMonthData, selectedYearData]);

  const renderWeekItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: SW(31.5),
        height: SH(60),
      }}
      onPress={() => {
        console.log(item?.day);
        setselectedDate(item?.day);
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.Regular,
          fontSize: SF(14),
          color: item?.day === selectedDate ? COLORS.primary : COLORS.dark_grey,
        }}
      >
        {moment(item?.day).format('ddd').toUpperCase()}
      </Text>
      <Text
        style={{
          fontFamily: Fonts.SemiBold,
          fontSize: SF(18),
          color: item?.day === selectedDate ? COLORS.primary : COLORS.black,
        }}
      >
        {item?.day === moment(new Date()).format('MM/DD/YY') ? 'Today' : item?.date}
      </Text>
    </TouchableOpacity>
  );

  const renderSlotItem = ({ item, index }) => (
    <TouchableOpacity
      disabled={!item?.is_available}
      style={{
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '25.1%',
        height: ms(24),
        borderColor: COLORS.solidGrey,
        backgroundColor: selectedTimeSlotIndex === index ? COLORS.primary : COLORS.white,
      }}
      onPress={() => {
        setselectedTimeSlotIndex(index);
        setSelectedTimeSlotData(item);
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.Regular,
          fontSize: ms(6.2),
          color: !item?.is_available
            ? COLORS.row_grey
            : selectedTimeSlotIndex === index
            ? COLORS.white
            : COLORS.dark_grey,
        }}
      >
        {item?.start_time + ' - ' + item?.end_time}
      </Text>
    </TouchableOpacity>
  );

  const onReschuleAppointment = () => {
    if (!selectedTimeSlotData) {
      alert('Please select a time slot to rechedule the appointment');
      return;
    }

    const params = {
      date: moment(selectedDate).format('YYYY-MM-DD'),
      start_time: selectedTimeSlotData?.start_time,
      end_time: selectedTimeSlotData?.end_time,
    };
    const appointmentId = appointmentData?.id;
    dispatch(rescheduleAppointment(appointmentId, params));
    setShowRescheduleModal(false);
    setshowEventDetailModal(false);
  };

  const onCancelAppoinment = () => {
    CustomAlert({
      title: strings.calender.cancelAppointment,
      onYesPress: handleCancelAppointment,
    });
  };

  const handleCancelAppointment = () => {
    const appointmentID = appointmentDetail?.appointment_id ?? '';
    dispatch(changeAppointmentStatus(appointmentID, APPOINTMENT_STATUS.REJECTED_BY_SELLER));
    setShowRescheduleModal(false);
    setshowEventDetailModal(false);
  };

  return (
    <Modal transparent isVisible={showRecheduleModal}>
      <View style={styles.addCartCon}>
        <View style={styles.addCartConHeader}>
          <TouchableOpacity onPress={() => setShowRescheduleModal(false)}>
            <Image source={crossButton} style={styles.crossBg} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.continueBtnCon} onPress={onCancelAppoinment}>
              <Text style={[styles.detailBtnCon, { color: COLORS.white }]}>Cancel Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addToCartCon, { width: 'auto' }]}
              onPress={onReschuleAppointment}
            >
              <Text style={styles.addTocartText}>Reschedule Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            width: windowWidth * 0.42,
            alignSelf: 'center',
          }}
        >
          <View>
            <Spacer space={SH(20)} />
            <Text style={styles.selected}>
              Service Time:{' '}
              <Text style={{ color: COLORS.primary }}>
                {selectedDate === moment(new Date()).format('MM/DD/YY')
                  ? `Today`
                  : moment(selectedDate).format('ll')}{' '}
                {`@ ${
                  selectedTimeSlotData
                    ? selectedTimeSlotData?.start_time
                    : appointmentData?.start_time
                } - ${
                  selectedTimeSlotData ? selectedTimeSlotData?.end_time : appointmentData?.end_time
                }`}
              </Text>
            </Text>
            <Spacer space={SH(15)} />
            <View style={styles.displayRow}>
              <View style={[styles.colorRow, styles.serviceRow]} />
              <Text style={styles.colorText}>Available slot</Text>
              <View style={[styles.colorRow, styles.serviceRow]} />
            </View>
            <Spacer space={SH(10)} />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <MonthYearPicker
                dateType={DATE_TYPE.MONTH}
                placeholder={'Select Month'}
                containerStyle={{ marginRight: 10 }}
                defaultValue={moment().month() + 1}
                onSelect={(monthData) => {
                  setselectedMonthData(monthData);
                }}
              />
              <MonthYearPicker
                dateType={DATE_TYPE.YEAR}
                placeholder={'Select Year'}
                defaultValue={moment().year()}
                onSelect={(yearData) => {
                  setselectedYearData(yearData);
                }}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: SH(15),
              borderWidth: 1,
              borderColor: COLORS.solidGrey,
              width: '100%',
            }}
          >
            <FlatList horizontal data={monthDays} renderItem={renderWeekItem} />

            <FlatList data={timeSlotsData || []} numColumns={4} renderItem={renderSlotItem} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
