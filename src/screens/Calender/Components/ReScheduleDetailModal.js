import React, { useState } from 'react';
import { Dimensions, Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { COLORS, SF, SH, SW } from '@/theme';
import { Button, Spacer } from '@/components';
import { crossButton, Fonts, pin } from '@/assets';
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
import ProfileImage from '@/components/ProfileImage';
import { ServiceProviderItem } from '@/components/ServiceProviderItem';
import { getAppointmentSelector } from '@/selectors/AppointmentSelector';
import { ScrollView } from 'react-native-gesture-handler';
import { memo } from 'react';

const windowWidth = Dimensions.get('window').width;

const ReScheduleDetailModal = ({
  showRecheduleModal,
  setShowRescheduleModal,
  appointmentData,
  setshowEventDetailModal,
}) => {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const timeSlotsData = getRetailData?.timeSlots;
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const appointmentDetail = appointmentData?.appointment_details[0];
  const posUserDetails = appointmentData?.pos_user_details;

  const getCalenderData = useSelector(getAppointmentSelector);
  const getStaffUsers = getCalenderData?.staffUsers;
  const [posUserId, setposUserId] = useState(null);
  const [providerDetail, setProviderDetail] = useState(null);
  const [selectedTimeSlotIndex, setselectedTimeSlotIndex] = useState(null);
  const [selectedTimeSlotData, setSelectedTimeSlotData] = useState('');
  const [selectedDate, setselectedDate] = useState(
    moment(appointmentData?.date).format('YYYY-MM-DD')
  );

  const [preSelectedStartTime, setpreSelectedStartTime] = useState(appointmentData?.start_time);
  const [preSelectedEndTime, setpreSelectedEndTime] = useState(appointmentData?.end_time);

  const [selectedMonthData, setselectedMonthData] = useState(null);
  const [selectedYearData, setselectedYearData] = useState(null);

  const [monthDays, setmonthDays] = useState([]);

  const userDetails = appointmentData?.user_details;
  const userAddress = userDetails?.current_address;

  useEffect(() => {
    setProviderDetail(posUserDetails?.user);
    setposUserId(posUserDetails?.user?.unique_uuid);
  }, [posUserDetails]);

  useEffect(() => {
    const params = {
      seller_id: sellerID,
      product_id: appointmentDetail?.product_id,
      date: selectedDate,
      pos_user_id: posUserId,
    };
    dispatch(getTimeSlots(params));
  }, [posUserId, selectedDate]);

  useEffect(() => {
    const daysArray = getDaysAndDates(selectedYearData?.value, selectedMonthData?.value);
    setmonthDays(daysArray);
  }, [selectedMonthData, selectedYearData]);

  const renderWeekItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: SW(31.5),
          height: SH(60),
        }}
        onPress={() => {
          setselectedDate(item?.completeDate);
          //Clear previous day selected time slot values
          setselectedTimeSlotIndex(null);
          setSelectedTimeSlotData('');
          setpreSelectedStartTime('');
          setpreSelectedEndTime('');
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.Regular,
            fontSize: SF(14),
            color: item?.completeDate === selectedDate ? COLORS.primary : COLORS.dark_grey,
          }}
        >
          {item?.day.toUpperCase()}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.SemiBold,
            fontSize: SF(18),
            color: item?.completeDate === selectedDate ? COLORS.primary : COLORS.black,
          }}
        >
          {item?.completeDate === moment(new Date()).format('YYYY-MM-DD') ? 'Today' : item?.date}
        </Text>
      </TouchableOpacity>
    );
  };

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
      date: selectedDate,
      start_time: selectedTimeSlotData?.start_time,
      end_time: selectedTimeSlotData?.end_time,
      pos_user_id: posUserId,
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

  const onClickServiceProvider = (item) => {
    setposUserId(item?.user?.unique_uuid);
    setProviderDetail(item?.user);
  };

  const handleCancelAppointment = () => {
    const appointmentID = appointmentDetail?.appointment_id ?? '';
    dispatch(changeAppointmentStatus(appointmentID, APPOINTMENT_STATUS.REJECTED_BY_SELLER));
    setShowRescheduleModal(false);
    setshowEventDetailModal(false);
  };

  const renderServiceProviderItem = ({ item }) => {
    const borderColor = item?.user?.unique_uuid === posUserId ? COLORS.primary : 'transparent';

    return (
      <ServiceProviderItem
        item={item}
        onPress={() => onClickServiceProvider(item)}
        borderColor={borderColor}
        imageStyle={{
          width: ms(30),
          height: ms(30),
          borderRadius: ms(15),
        }}
      />
    );
  };

  return (
    <Modal transparent isVisible={showRecheduleModal}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.addCartCon}>
          <View style={styles.addCartConHeader}>
            <TouchableOpacity onPress={() => setShowRescheduleModal(false)}>
              <Image source={crossButton} style={styles.crossBg} />
            </TouchableOpacity>
            <Text style={{ fontFamily: Fonts.Regular, fontSize: ms(10) }}>
              Booking #{appointmentData?.id ?? 'ABC'}
            </Text>
          </View>
          {userDetails && (
            <View
              style={[
                styles.customerDetailContainer,
                { marginTop: ms(15), marginHorizontal: ms(22) },
              ]}
            >
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
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={pin} style={styles.eventAddressIcon} />
                    <Text style={styles.eventAddress}>{userAddress?.street_address}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          <View
            style={{
              width: windowWidth * 0.42,
              alignSelf: 'center',
              marginTop: userDetails ? 0 : ms(10),
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View>
                  <Text style={[styles.selected, { fontSize: ms(12) }]}>
                    {appointmentDetail?.product_name}
                  </Text>
                  <Text style={{ fontFamily: Fonts.Regular, fontSize: ms(9), marginTop: ms(5) }}>
                    Est 45-60 mins
                  </Text>
                </View>
                <Text style={[styles.selected, { fontSize: ms(12) }]}>
                  {`$${appointmentData?.payable_amount}`}
                </Text>
              </View>
              <Spacer space={ms(10)} />
              <View style={styles.displayRow}>
                <View style={[styles.colorRow, styles.serviceRow]} />
                <Text style={styles.colorText}>SERVICE PROVIDER</Text>
                <View style={[styles.colorRow, styles.serviceRow]} />
              </View>

              <Text style={styles.selected}>
                Selected:{' '}
                <Text style={{ color: COLORS.primary }}>
                  {providerDetail?.user_profiles?.firstname +
                    ' ' +
                    providerDetail?.user_profiles?.lastname}
                </Text>
              </Text>
              <Spacer space={ms(10)} />
              <FlatList
                data={getStaffUsers}
                renderItem={renderServiceProviderItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
              <Spacer space={ms(10)} />

              <View style={styles.displayRow}>
                <View style={[styles.colorRow, styles.serviceRow]} />
                <Text style={styles.colorText}>AVAILABLE SLOT</Text>
                <View style={[styles.colorRow, styles.serviceRow]} />
              </View>
              <Spacer space={ms(10)} />
              <Text style={styles.selected}>
                Service Time:{' '}
                <Text style={{ color: COLORS.primary }}>
                  {selectedDate === moment(new Date()).format('YYYY-MM-DD')
                    ? `Today`
                    : moment(selectedDate).format('ll')}
                  {selectedTimeSlotData || (preSelectedStartTime && preSelectedEndTime) ? (
                    <>
                      {' '}
                      @{' '}
                      {selectedTimeSlotData
                        ? selectedTimeSlotData?.start_time
                        : preSelectedStartTime}{' '}
                      - {selectedTimeSlotData ? selectedTimeSlotData?.end_time : preSelectedEndTime}
                    </>
                  ) : null}
                </Text>
              </Text>
              <Spacer space={ms(10)} />
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
                  defaultYear={selectedYearData?.value ?? moment().year()}
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

              <FlatList
                scrollEnabled={false}
                data={timeSlotsData || []}
                numColumns={4}
                renderItem={renderSlotItem}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: ms(10),
              marginHorizontal: ms(26),
              alignSelf: 'center',
            }}
          >
            <Button
              title="Cancel Booking"
              textStyle={[styles.detailBtnCon]}
              style={[styles.continueBtnCon, { flex: 1 }]}
              onPress={onCancelAppoinment}
            />
            <Spacer space={ms(10)} horizontal />
            <Button
              title="Save Modification"
              textStyle={styles.addTocartText}
              style={[styles.addToCartCon, { flex: 1 }]}
              onPress={onReschuleAppointment}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default memo(ReScheduleDetailModal);
