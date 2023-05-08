import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {
  crossButton,
  Fonts,
  notifications,
  Phone_light,
  search_light,
  location,
  watchLogo,
  roundCalender,
  email,
  leftlight,
  rightlight,
  iImage,
  userImage,
} from '@/assets';
import { strings } from '@/localization';
import { COLORS, SF, SW, SH } from '@/theme';
import { Spacer } from '@/components';
import { styles } from '@/screens/Calender/Calender.styles';
import { moderateScale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-big-calendar';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { CALENDAR_MODES } from '@/constants/enums';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeAppointmentStatus,
  getAppointment,
} from '@/actions/AppointmentAction';
import { getAuthData } from '@/selectors/AuthSelector';
import { getAppointmentSelector } from '@/selectors/AppointmentSelector';
import { ActivityIndicator } from 'react-native';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/AppointmentTypes';
import { APPOINTMENT_STATUS } from '@/constants/status';

export function Calender(props) {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getCalenderData = useSelector(getAppointmentSelector);
  const getAppointmentList = getCalenderData?.getAppointment;
  const [storeItem, setStoreItem] = useState();
  const [extractedAppointment, setExtractedAppointment] = useState([]);

  useEffect(() => {
    dispatch(getAppointment());
  }, []);

  useEffect(() => {
    let extractedAppointmentEvents = [];
    if (getAppointmentList) {
      getAppointmentList.map(booking => {
        const startDateTime = new Date(booking.start_date_time);
        const endDateTime = new Date(booking.end_date_time);

        extractedAppointmentEvents = [
          ...extractedAppointmentEvents,
          {
            title:
              getAppointmentList[0].appointment_details[0].product_name ??
              'NULL',
            start: startDateTime,
            end: endDateTime,
          },
        ];
      });
      setExtractedAppointment(extractedAppointmentEvents);
    }
  }, [getAppointmentList]);

  const [schduleDetail, setSchduleDetail] = useState(false);
  const [week, setWeek] = useState(true);
  const [month, setMonth] = useState(false);
  const [day, setDay] = useState(false);

  const [calendarDate, setCalendarDate] = useState(moment());
  const [calendarMode, setCalendarMode] = useState(CALENDAR_MODES.WEEK);

  const nextMonth = () =>
    setCalendarDate(calendarDate.clone().add(1, calendarMode));
  const prevMonth = () =>
    setCalendarDate(calendarDate.clone().subtract(1, calendarMode));

  const weekHandler = () => {
    setCalendarMode(CALENDAR_MODES.WEEK);
    setWeek(!week);
    setMonth(false);
    setDay(false);
  };
  const monthHandler = () => {
    setCalendarMode(CALENDAR_MODES.MONTH);
    setMonth(!month);
    setWeek(false);
    setDay(false);
  };
  const dayHandler = () => {
    setCalendarMode(CALENDAR_MODES.DAY);
    setDay(!day);
    setMonth(false);
    setWeek(false);
  };

  const getFormattedHeaderDate = () => {
    if (
      calendarMode === CALENDAR_MODES.MONTH ||
      calendarMode === CALENDAR_MODES.WEEK
    ) {
      return calendarDate.format('MMM YYYY');
    } else if (calendarMode === CALENDAR_MODES.DAY) {
      return calendarDate.format('DD MMM YYYY');
    }
  };
  const isRequestLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_APPOINTMENTS], state)
  );

  const getStartEndFormattedDate = date => {
    return `${moment(date).format('hh:mm A')}`;
  };

  const notificationItem = ({ item }) => (
    <View style={styles.notificationchildCon}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={styles.requestFor} numberOfLines={1}>
          {strings.calender.requestFor}{' '}
          <Text style={styles.requestTextName}>
            {item.appointment_details?.[0]?.product_name}{' '}
            {item.appointment_details?.length >= 2 ? 'and more' : null}
          </Text>
        </Text>
        <TouchableOpacity
          style={styles.iImageCon}
          onPress={() => (setSchduleDetail(true), setStoreItem(item))}
        >
          <Image source={iImage} style={styles.iImage} />
        </TouchableOpacity>
      </View>
      <Spacer space={SH(3)} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={watchLogo} style={styles.watch} />
        <Text style={styles.timeLabel}>
          {strings.calender.timeLabel}{' '}
          <Text style={{ fontFamily: Fonts.SemiBold }}>
            {item.start_time}
            {'-'}
            {item.end_time}
          </Text>
        </Text>
      </View>
      <Spacer space={SH(3)} />
      <View style={{ flexDirection: 'row' }}>
        <Image source={roundCalender} style={styles.roundCalender} />
        <Text style={styles.timeLabel}>
          {strings.calender.dateLabel}{' '}
          <Text style={{ fontFamily: Fonts.SemiBold }}>
            {moment(item.date).format('dddd')}, {moment(item.date).format('ll')}
          </Text>
        </Text>
      </View>
      <Spacer space={SH(15)} />
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
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
          style={styles.approveButtonCon}
        >
          <Text style={styles.approveText}>{strings.calender.approve}</Text>
        </TouchableOpacity>
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
          style={styles.noButtonCon}
        >
          <Text style={styles.approveText}>{strings.calender.no}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const schduleDetailModal = () => {
    return (
      <Modal transparent isVisible={schduleDetail}>
        <View style={styles.modalMainView}>
          <View style={styles.headerView}>
            <View style={styles.headerBody}>
              <Text>{null}</Text>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.calender.scheduledetails}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSchduleDetail(false);
                }}
                style={{ width: SW(2) }}
              >
                <Image source={crossButton} style={styles.crossIconStyle} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingHorizontal: moderateScale(15) }}>
            <Spacer space={SH(30)} />
            <View style={styles.flexAlign}>
              <Image
                source={
                  storeItem?.user_details?.profile_photo
                    ? { uri: storeItem?.user_details?.profile_photo }
                    : userImage
                }
                style={styles.charlene}
              />
              <View style={{ paddingHorizontal: moderateScale(10) }}>
                <Text style={styles.charleneName}>
                  {storeItem?.user_details?.username}
                </Text>
                <View style={styles.flexAlign}>
                  <Image source={location} style={styles.location} />
                  <Text style={styles.address}>{strings.calender.addr}</Text>
                </View>
                <View style={styles.flexAlign}>
                  <Image source={Phone_light} style={styles.location} />
                  <Text style={styles.address}>
                    {storeItem?.user_details?.phone_number}
                  </Text>
                </View>
                <View style={styles.flexAlign}>
                  <Image source={email} style={styles.location} />
                  <Text style={styles.address}>
                    {storeItem?.user_details?.email}
                  </Text>
                </View>
              </View>
            </View>
            <Spacer space={SH(30)} />
            <Text style={styles.appointment}>
              {strings.calender.appointment}
            </Text>
            <Spacer space={SH(15)} />
            <View>
              <Text style={styles.service}>service</Text>
              <Spacer space={SH(8)} />
              <View style={styles.serviceTextCon}>
                {storeItem?.appointment_details?.map((item, index) => (
                  <Text style={styles.serviceType} key={index}>
                    {item.product_name}
                    {storeItem?.appointment_details?.length >= 2 ? ',' : null}
                  </Text>
                ))}
              </View>
            </View>
            <Spacer space={SH(15)} />
            <View>
              <View style={styles.displayFlex}>
                <Text style={styles.service}>{strings.calender.apt}</Text>
                <View style={styles.upcomingCon}>
                  <Text style={styles.upcomingText}>
                    {strings.calender.upcoming}
                  </Text>
                </View>
              </View>
              <Spacer space={SH(8)} />
              <Text style={styles.serviceType}>{strings.calender.aptDate}</Text>
            </View>
            <Spacer space={SH(30)} />
            <View>
              <Text style={styles.service}>{strings.calender.conform}</Text>
              <Spacer space={SH(8)} />
              <Text style={styles.serviceType}>
                {moment(storeItem?.date).format('ll')}{' '}
                {moment(storeItem?.date).format('LT')}
              </Text>
            </View>
            <Spacer space={SH(30)} />
            <View>
              <Text style={styles.service}>{strings.calender.paidAmount}</Text>
              <Spacer space={SH(8)} />
              <Text style={styles.serviceType}>
                {storeItem?.mode_of_payment.toUpperCase()}{' '}
                {storeItem?.payable_amount}
              </Text>
            </View>
            <Spacer space={SH(50)} />
          </View>
        </View>
      </Modal>
    );
  };
  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        <View style={styles.deliveryView}>
          <Image source={roundCalender} style={styles.truckStyle} />
          <Text style={styles.deliveryText}>{strings.calender.calender}</Text>
        </View>
        <View style={styles.deliveryView}>
          <Image
            source={notifications}
            style={[styles.truckStyle, { right: 25 }]}
          />
          <View style={styles.searchView}>
            <Image source={search_light} style={styles.searchImage} />
            <TextInput
              placeholder={strings.deliveryOrders.search}
              style={styles.textInputStyle}
              placeholderTextColor={COLORS.darkGray}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {customHeader()}
      <View style={[styles.displayFlex, styles.calenderContainer]}>
        <View style={styles.calenderCon}>
          <View style={styles.calenderHeader}>
            <View style={styles.displayFlex}>
              <View style={styles.monthlySchduel}>
                <View style={styles.displayFlex}>
                  <TouchableOpacity onPress={prevMonth}>
                    <Image source={leftlight} style={styles.leftLight} />
                  </TouchableOpacity>
                  <Text style={styles.monthlySchduleDate}>
                    {`${getFormattedHeaderDate()}`}
                  </Text>
                  <TouchableOpacity onPress={nextMonth}>
                    <Image source={rightlight} style={styles.leftLight} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.flexAlign}>
                <TouchableOpacity
                  style={
                    day ? styles.clickedButtonCon : styles.unClickedButtonCon
                  }
                  onPress={dayHandler}
                >
                  <Text style={day ? styles.checkedText : styles.unCheckedText}>
                    {strings.calender.day}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    week ? styles.clickedButtonCon : styles.unClickedButtonCon
                  }
                  onPress={weekHandler}
                >
                  <Text
                    style={week ? styles.checkedText : styles.unCheckedText}
                  >
                    {strings.calender.week}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    month ? styles.clickedButtonCon : styles.unClickedButtonCon
                  }
                  onPress={monthHandler}
                >
                  <Text
                    style={month ? styles.checkedText : styles.unCheckedText}
                  >
                    {strings.calender.month}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text>{null}</Text>
            </View>
          </View>

          <Calendar
            ampm
            swipeEnabled={false}
            mode={calendarMode}
            events={extractedAppointment}
            height={windowHeight * 0.2}
            date={calendarDate}
            renderEvent={(event, touchableOpacityProps) => (
              <TouchableOpacity
                style={[...touchableOpacityProps.style, styles.eventContainer]}
              >
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.startEndDate}>
                  {getStartEndFormattedDate(event.start)}
                </Text>
                <Text style={styles.startEndDate}>
                  {getStartEndFormattedDate(event.end)}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.notificationCon}>
          {/* <View> */}
          {isRequestLoading ? (
            <View style={{ marginTop: 50 }}>
              <ActivityIndicator size="large" color={COLORS.indicator} />
            </View>
          ) : (
            <FlatList
              data={getAppointmentList}
              extraData={getAppointmentList}
              renderItem={notificationItem}
              keyExtractor={item => item.id}
            />
          )}
          {/* </View> */}
        </View>
      </View>
      {schduleDetailModal()}
    </View>
  );
}
