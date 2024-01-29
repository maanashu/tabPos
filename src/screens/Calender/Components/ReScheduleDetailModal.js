import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { COLORS, SF, SH, SW, ShadowStyles } from '@/theme';
import { ArrowButton, Button, Spacer } from '@/components';
import { crossButton, Fonts, pin, userImage } from '@/assets';
import { getRetail } from '@/selectors/RetailSelectors';

import { getTimeSlots } from '@/actions/RetailAction';
import MonthYearPicker, { DATE_TYPE } from '../../../components/MonthYearPicker';
import { useEffect } from 'react';
import moment from 'moment';
import Modal, { ReactNativeModal } from 'react-native-modal';
import { styles } from '../Calender.styles';
import {
  calculateDuration,
  calculateTimeDuration,
  calculateTimeSlotSelection,
  getDaysAndDates,
} from '@/utils/GlobalMethods';
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
import { TYPES } from '@/Types/Types';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { Modal as PaperModal } from 'react-native-paper';
import { height, width } from '@/theme/ScalerDimensions';
import { Images } from '@/assets/new_icon';
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;

const ReScheduleDetailModal = ({
  showRecheduleModal,
  setShowRescheduleModal,
  appointmentData,
  setshowEventDetailModal,
}) => {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);

  const timeSlotInterval = getRetailData?.timeSlotInterval;
  const estimatedServiceTime = appointmentData?.approx_service_time;
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const appointmentDetail = appointmentData;
  const posUserDetails = appointmentData?.pos_user_details;
  const [selectedTimeSlotIndex, setselectedTimeSlotIndex] = useState(null);
  const getCalenderData = useSelector(getAppointmentSelector);
  const getStaffUsers = getCalenderData?.staffUsers;
  const [posUserId, setposUserId] = useState(null);
  const [providerDetail, setProviderDetail] = useState(null);
  const [selectedTimeSlotData, setSelectedTimeSlotData] = useState('');
  const [selectedDate, setselectedDate] = useState(
    moment(appointmentData?.date).format('YYYY-MM-DD')
  );

  const [preSelectedStartTime, setpreSelectedStartTime] = useState(appointmentData?.start_time);
  const [preSelectedEndTime, setpreSelectedEndTime] = useState(appointmentData?.end_time);
  const [timeSlotsData, setTimeSlotsData] = useState([]);

  const [selectedMonthData, setselectedMonthData] = useState(null);
  const [selectedYearData, setselectedYearData] = useState(null);

  const [monthDays, setmonthDays] = useState([]);

  const userDetails = appointmentData?.user_details;
  const userAddress = userDetails?.current_address;

  useEffect(() => {
    if (getRetailData?.timeSlots) {
      const timeSlots = getRetailData?.timeSlots?.filter((timeSlot) => timeSlot?.is_available);
      setTimeSlotsData([...timeSlots]);
    }
  }, [getRetailData?.timeSlots]);

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

  const isLoadingTimeSlot = useSelector((state) =>
    isLoadingSelector([TYPES.GET_TIME_SLOTS], state)
  );

  const renderWeekItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: SW(20),
          height: SH(60),
          backgroundColor:
            item?.completeDate === selectedDate ? COLORS.success_green : COLORS.white,
          marginHorizontal: ms(3),
          borderRadius: ms(13),
          marginVertical: 1,
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
            fontSize: SF(13),
            color: item?.completeDate === selectedDate ? COLORS.white : COLORS.navy_blue,
          }}
        >
          {item?.completeDate === moment(new Date()).format('YYYY-MM-DD') ? 'Today' : item?.day}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.Medium,
            fontSize: SF(14),
            color: item?.completeDate === selectedDate ? COLORS.white : COLORS.navy_blue,
          }}
        >
          {item?.date}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSlotItem = ({ item, index }) => (
    <>
      {!item?.is_available ? (
        <Image
          source={Images.calendar_cell}
          resizeMode="contain"
          style={{ width: '24.1%', height: ms(23.5), marginVertical: ms(1.5) }}
        />
      ) : (
        <TouchableOpacity
          disabled={!item?.is_available}
          style={{
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '23.5%',
            height: ms(24),
            borderColor:
              selectedTimeSlotIndex === index ? COLORS.medium_green : COLORS.light_purple,
            backgroundColor: selectedTimeSlotIndex === index ? COLORS.light_green : COLORS.white,
            borderRadius: 8,
            margin: ms(1.5),
            overflow: 'hidden',
          }}
          onPress={() => {
            setselectedTimeSlotIndex(index);
            setSelectedTimeSlotData(item);
          }}
        >
          {item?.is_available && (
            <Text
              style={{
                fontFamily: Fonts.Regular,
                fontSize: ms(6.2),
                color: !item?.is_available
                  ? COLORS.row_grey
                  : selectedTimeSlotIndex === index
                  ? COLORS.medium_green
                  : COLORS.faded_purple,
              }}
            >
              {item?.start_time + ' - ' + item?.end_time}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </>
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
    const appointmentID = appointmentDetail?.id ?? '';
    dispatch(changeAppointmentStatus(appointmentID, APPOINTMENT_STATUS.REJECTED_BY_SELLER));
    setShowRescheduleModal(false);
    setshowEventDetailModal(false);
  };

  const renderServiceProviderItem = ({ item }) => {
    const borderColor = item?.user?.unique_uuid === posUserId ? 'transparent' : COLORS.light_purple;
    const imageUrl = item?.user?.user_profiles?.profile_photo;
    const isPng = imageUrl?.toLowerCase().endsWith('.png');
    return (
      <TouchableOpacity
        onPress={() => onClickServiceProvider(item)}
        style={[
          styles.staffInfoContainer,
          {
            borderColor: borderColor,
            ...(item?.user?.unique_uuid === posUserId && ShadowStyles.shadow3),
          },
        ]}
      >
        <Image
          source={imageUrl && isPng ? { uri: imageUrl } : userImage}
          style={imageUrl && isPng ? styles.staffProfilePic : styles.staticEmployeeImages}
        />

        <Spacer horizontal space={ms(5)} />

        <View>
          <Text
            numberOfLines={1}
            style={styles.staffNameText}
          >{`${item?.user?.user_profiles?.firstname} ${item?.user?.user_profiles?.lastname}`}</Text>
          <Text numberOfLines={1} style={styles.occupationText}>
            {''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ReactNativeModal
      backdropOpacity={0.1}
      isVisible={showRecheduleModal}
      style={{
        right: Platform.OS == 'ios' ? width * 0.055 : width * 0.04,
        top: Platform.OS == 'ios' ? height * 0.03 : height * 0.06,
      }}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationInTiming={800}
    >
      <View style={styles.addCartCon}>
        <View style={styles.addCartConHeader}>
          <View style={styles.rowAligned}>
            <Image source={Images.modifyAppointment} style={styles.calendarIcon} />
            <Spacer horizontal space={ms(5)} />

            <Text style={styles.modalHeading}>
              Edit Appointment #{appointmentData?.id ?? 'ABC'}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setShowRescheduleModal(false)}>
            <Image source={crossButton} style={styles.closeIconSmall} />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {userDetails && (
              <View
                style={[
                  styles.customerDetailContainer,
                  { marginTop: ms(15), marginHorizontal: ms(22) },
                ]}
              >
                <View style={styles.rowAlignedJustified}>
                  <Text style={styles._eventTitle}>Customer:</Text>
                  <View style={styles.appointmentDateContainer}>
                    <Image source={Images.calendarIcon} style={styles.bookedCalendarIcon} />
                    <Spacer horizontal space={ms(3)} />
                    <Text style={styles.bookedDate}>
                      {moment(appointmentData?.start_date_time).format('DD/MM/YYYY. ')}
                    </Text>
                    <Text style={styles.bookedDate}>{`${moment(
                      appointmentData?.start_date_time
                    ).format('hh:mm A')}-${moment(appointmentData?.end_date_time).format(
                      'hh:mm A'
                    )}`}</Text>
                  </View>
                </View>

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

                <Spacer space={ms(10)} />
                <FlatList
                  data={getStaffUsers}
                  renderItem={renderServiceProviderItem}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}

            <View
              style={{
                width: windowWidth * 0.42,
                alignSelf: 'center',
                marginTop: userDetails ? 0 : ms(10),
              }}
            >
              {/* <View>
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
                      Est {estimatedServiceTime} mins
                    </Text>
                  </View>
                  <Text style={[styles.selected, { fontSize: ms(12) }]}>
                    {`$${appointmentData?.price}`}
                  </Text>
                </View>

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
              </View> */}

              <View
                style={{
                  marginTop: SH(10),
                  // borderWidth: 1,
                  // borderColor: COLORS.solidGrey,
                  width: '100%',
                }}
              >
                <FlatList
                  horizontal
                  data={monthDays}
                  renderItem={renderWeekItem}
                  showsHorizontalScrollIndicator={false}
                />

                <Spacer space={ms(10)} />
                {isLoadingTimeSlot ? (
                  <View style={{ paddingVertical: ms(40) }}>
                    <ActivityIndicator size={'large'} />
                  </View>
                ) : (
                  <FlatList
                    scrollEnabled={false}
                    data={timeSlotsData || []}
                    numColumns={4}
                    renderItem={renderSlotItem}
                    ListEmptyComponent={() => (
                      <View
                        style={{
                          height: ms(50),
                          paddingHorizontal: ms(10),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={{ fontFamily: Fonts.SemiBold, fontSize: ms(10) }}>
                          There are no slots available for this day
                        </Text>
                      </View>
                    )}
                  />
                )}
              </View>
            </View>
            <View style={styles.cancelSavebtnReschedule}>
              <Button
                title="Cancel Appointment"
                textStyle={[styles.detailBtnCon]}
                style={[styles.continueBtnCon, {}]}
                onPress={onCancelAppoinment}
              />
              <Spacer space={ms(10)} horizontal />
              <ArrowButton
                title="Accept Changes"
                textStyle={styles.addTocartText}
                style={[styles.addToCartCon, {}]}
                onPress={onReschuleAppointment}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </ReactNativeModal>
  );
};

export default memo(ReScheduleDetailModal);
