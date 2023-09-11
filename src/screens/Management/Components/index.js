import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { moderateScale } from 'react-native-size-matters';
import { allien, calendar1, dropdown2, roundCalender, userImage } from '@/assets';
import { strings } from '@/localization';
import { styles } from '@/screens/Management/Management.styles';
import { Spacer, TableDropdown } from '@/components';
import { Table } from 'react-native-table-component';
const windowWidth = Dimensions.get('window').width;
import DropDownPicker from 'react-native-dropdown-picker';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { ActivityIndicator } from 'react-native';
import { DarkTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { getSessionHistory } from '@/actions/CashTrackingAction';
import { width } from '@/theme/ScalerDimensions';
import { transactionDataList } from '@/constants/flatListData';
const windowHeight = Dimensions.get('window').height;

moment.suppressDeprecationWarnings = true;

export function SessionHistoryTable({
  tableTouchHandler,
  tableDataArray,
  sessionHistoryLoad,
  // oneItemSend,
  setSessionHistoryArray,
}) {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [dateformat, setDateformat] = useState('');
  const [show, setShow] = useState(false);
  const onChangeDate = (selectedDate) => {
    setSessionHistoryArray([]);
    const currentDate = moment().format('MM/DD/YYYY');
    const selected = moment(selectedDate).format('MM/DD/YYYY');
    setShow(false);
    const month = selectedDate.getMonth() + 1;
    const selectedMonth = month < 10 ? '0' + month : month;
    const day = selectedDate.getDate();
    const selectedDay = day < 10 ? '0' + day : day;
    const year = selectedDate.getFullYear();
    const fullDate = selectedMonth + ' / ' + selectedDay + ' / ' + year;
    const newDateFormat = year + '-' + selectedMonth + '-' + selectedDay;
    setDateformat(newDateFormat);
    setDate(fullDate);
    if (newDateFormat) {
      dispatch(getSessionHistory(newDateFormat));
    }
  };
  const onCancelFun = () => {
    setShow(false);
    setDateformat('');
    setDate(new Date());
    dispatch(getSessionHistory());
  };

  // const tableDataArrayReverse = tableDataArray?.reverse();
  const tableDataArrayReverse = tableDataArray?.slice().reverse();
  console.log('asfasa', JSON.stringify(tableDataArrayReverse));

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.sessionHistory}>{strings.management.sessionHistory}</Text>
      <Spacer space={SH(20)} />
      <View style={styles.datePickerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.datePickerCon} onPress={() => setShow(!show)}>
            <Image source={calendar1} style={styles.calendarStyle} />
            <TextInput
              value={date}
              returnKeyType={'done'}
              pointerEvents={'none'}
              autoCapitalize={'none'}
              editable={false}
              placeholder="Date"
              placeholderTextColor={COLORS.gerySkies}
              style={styles.txtInput}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            mode={'date'}
            isVisible={show}
            onConfirm={onChangeDate}
            onCancel={() => onCancelFun()}
            maximumDate={new Date()}
          />
          <View style={{ marginHorizontal: moderateScale(10) }}>
            <TableDropdown placeholder="Staff" />
          </View>
        </View>
      </View>
      <View style={[styles.tableMainView]}>
        <Table>
          <View style={styles.tableDataHeaderCon}>
            <View style={styles.displayFlex}>
              <View
                style={{
                  flexDirection: 'row',
                  width: windowWidth * 0.22,
                }}
              >
                <Text style={styles.text}>#</Text>
                <Text
                  style={[
                    styles.text,
                    {
                      paddingHorizontal: moderateScale(10),
                    },
                  ]}
                >
                  Date
                </Text>
              </View>
              <View style={[styles.dateHeadAlign]}>
                <Text style={styles.historyHeaderText}>Ended By</Text>
                <Text style={styles.historyHeaderText}>Session Started</Text>
                <Text style={styles.historyHeaderText}>Added cash</Text>
                <Text style={styles.historyHeaderText}>Removed cash</Text>
                <Text style={styles.historyHeaderText}>Counted cash</Text>
                <Text style={[styles.historyHeaderText, { paddingRight: 25 }]}>Session Ended</Text>
              </View>
            </View>
          </View>
          <View style={{ height: windowHeight * 0.67 }}>
            <ScrollView>
              {sessionHistoryLoad ? (
                <View style={{ marginTop: 100 }}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : tableDataArrayReverse?.length === 0 ? (
                <View style={{ marginTop: 80 }}>
                  <Text style={styles.userNotFound}>History not found</Text>
                </View>
              ) : (
                tableDataArrayReverse?.map((item, index) => (
                  <TouchableOpacity
                    style={styles.tableDataCon}
                    onPress={
                      () => tableTouchHandler(item)

                      // ,oneItemSend(item)
                    }
                    key={index}
                  >
                    <View style={styles.displayFlex}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: windowWidth * 0.22,
                        }}
                      >
                        <Text style={[styles.usertableRowText, { textAlign: 'left' }]}>
                          {index + 1}
                        </Text>
                        <View style={{ paddingHorizontal: moderateScale(10) }}>
                          <Text style={styles.usertableRowText}>
                            {moment(item.created_at).format('LL') ?? ''}
                          </Text>
                          <Text style={[styles.usertableRowText, { textAlign: 'left' }]}>
                            {moment(item.created_at).format('h : mm A')}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.dateTimeAlign}>
                        <View
                          style={[
                            styles.historydataText,
                            {
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                            },
                          ]}
                        >
                          <Image
                            source={{
                              uri: item.seller_details?.user_profiles?.profile_photo,
                            }}
                            style={[styles.allienpic, { marginRight: 4 }]}
                          />
                          <Text
                            style={[styles.usertableRowText, { width: windowWidth * 0.09 }]}
                            numberOfLines={1}
                          >
                            {item.seller_details?.user_profiles?.firstname}
                          </Text>
                        </View>
                        <Text style={styles.historydataText} numberOfLines={1}>
                          ${item.start_tracking_session}
                          {'.00'}
                        </Text>
                        <Text style={styles.historydataText} numberOfLines={1}>
                          ${item.add_cash}
                          {'.00'}
                        </Text>
                        <Text style={styles.historydataText} numberOfLines={1}>
                          ${item.removed_cash}
                          {'.00'}
                        </Text>
                        <Text style={styles.historydataText} numberOfLines={1}>
                          ${item.counted_cash}
                          {'.00'}
                        </Text>
                        <Text
                          style={[
                            styles.historydataText,
                            {
                              color:
                                item.end_tracking_session < 0 ? COLORS.orange : COLORS.solid_grey,
                            },
                          ]}
                          numberOfLines={1}
                        >
                          {item.end_tracking_session < 0 ? '-' : null} $
                          {item.end_tracking_session < 0
                            ? Math.abs(item.end_tracking_session)
                            : item.end_tracking_session}
                          {'.00'}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </Table>
      </View>
    </View>
  );
}
export function SummaryHistory({ historyHeader, sessionHistoryArray }) {
  const finalCashInArray = sessionHistoryArray?.drawer_activites.filter(
    (item) => item.mode_of_cash === 'cash_in'
  );
  const sessionCashCount = finalCashInArray?.map((item) => item.amount);
  const sessionCashSum = sessionCashCount?.reduce((partialSum, a) => partialSum + a, 0);
  const finalCashOutArray = sessionHistoryArray?.drawer_activites.filter(
    (item) => item.mode_of_cash === 'cash_out'
  );
  const sessionCashOutCount = finalCashOutArray?.map((item) => item.amount);
  const sessionCashOutSum = sessionCashOutCount?.reduce((partialSum, a) => partialSum + a, 0);

  const reverseArray = sessionHistoryArray?.drawer_activites.reverse();

  const correctWay = (transaction_type) => {
    if (transaction_type === 'start_tracking_session') {
      return 'Start tracking session';
    } else if (transaction_type === 'manual_cash_in') {
      return 'Manual Cash In';
    } else if (transaction_type === 'manual_cash_out') {
      return 'Manual cash out';
    } else if (transaction_type === 'counted_cash') {
      return 'Counted Cash';
    } else if (transaction_type === 'counted_cash') {
      return 'Counted Cash';
    } else if (transaction_type === 'delivery_charge') {
      return 'Delivery charge';
    } else if (transaction_type === 'shipping_charge') {
      return 'Shipping charge';
    } else if (transaction_type === 'sales') {
      return 'Sales';
    } else if (transaction_type === 'refund') {
      return 'Refund';
    } else if (transaction_type === 'end_tracking_session') {
      return 'End tracking session';
    }

    // switch (transaction_type) {
    //   // case manual_cash_in:
    //   //   return 'Manual Cash in';
    //   //   break;
    //     case manual_cash_out:
    //       return 'Manual Cash out';
    //       break;
    //       case counted_cash:
    //         return 'Counted Cash';
    //         break;
    //         case delivery_charge:
    //           return 'Delivery charge';
    //           break;
    //           case shipping_charge:
    //             return 'Shipping charge';
    //             break;
    //             case sales:
    //               return 'Sales';
    //               break;
    //               case refund:
    //                 return 'Refund';
    //                 break;
    // }
  };
  return (
    <View style={historyHeader ? styles.bodyContainer : styles.bodyContainer2}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer space={SH(20)} />
        <Text style={styles.allCashText}>{strings.management.allCash}</Text>
        <View>
          <View style={styles.totalCashHeader}>
            <Text style={styles.sectionListHeader}>{strings.management.totalCashIn}</Text>
            <Text style={styles.sectionListHeader}>
              {strings.management.usd}
              {sessionCashSum ?? '0'}
              {'.00'}
            </Text>
          </View>
          {finalCashInArray?.map((item, index) => (
            <View style={styles.totalCashData} key={index}>
              <Text style={styles.sectionListData}>
                {strings.management.sale}
                {correctWay(item.transaction_type)}
              </Text>
              <Text style={styles.sectionListData}>
                {strings.management.usd}
                {item.amount}
                {'.00'}
              </Text>
            </View>
          ))}

          <View style={styles.totalCashHeader}>
            <Text style={styles.sectionListHeader}>{strings.management.totalCashOut}</Text>
            <Text style={styles.sectionListHeader}>
              {strings.management.usd}
              {sessionCashOutSum ?? '0'}
              {'.00'}
            </Text>
          </View>
          {finalCashOutArray?.map((item, index) => (
            <View style={styles.totalCashData} key={index}>
              <Text style={styles.sectionListData}>{correctWay(item.transaction_type)}</Text>
              <Text style={styles.sectionListData}>
                {strings.management.usd}
                {item.amount}
                {'.00'}
              </Text>
            </View>
          ))}

          <View style={styles.netPaymentHeader}>
            <Text style={styles.sectionListHeader}>{strings.management.netPayment}</Text>
            <Text style={styles.sectionListHeader}>
              {strings.management.totalCash}
              {sessionHistoryArray?.cash_balance}
              {'.00'}
            </Text>
          </View>
          <Spacer space={SH(60)} />
          <Text style={styles.cashActivity}>{strings.management.cashActivity}</Text>
          <Spacer space={SH(20)} />
          {reverseArray?.map((item, index) => (
            <View style={styles.cashActivityCon} key={index}>
              <View style={styles.displayFlex}>
                <Text style={styles.cashActivityDarkText}>{correctWay(item.transaction_type)}</Text>
                <Text style={styles.cashActivityDarkText}>
                  {strings.management.usd}
                  {item.amount}
                  {'.00'}
                </Text>
              </View>
              {item.discrepency_amount === null ? null : (
                <View style={styles.displayFlex}>
                  <Text style={styles.cashActivityRedText}>{strings.management.discrepancy}</Text>
                  <Text style={styles.cashActivityRedText}>
                    {strings.management.removeusd}
                    {item.discrepency_amount}
                    {'.00'}
                  </Text>
                </View>
              )}
              <Spacer space={SH(4)} />
              <View style={styles.displayFlex}>
                <Text style={styles.cashActivityLightText}>
                  {sessionHistoryArray?.seller_details?.user_profiles?.firstname}
                </Text>
                <Text style={styles.cashActivityLightText}>
                  {moment(item.created_at).format('dddd, MMMM Do YYYY | h:mm A')}
                </Text>
              </View>
              <Spacer space={SH(4)} />
              {item.note === null ? null : (
                <View style={styles.displayFlex}>
                  <Text style={styles.cashActivityLightText}>Note : {item.note}</Text>
                  <Text style={styles.cashActivityLightText}>{null}</Text>
                </View>
              )}
            </View>
          ))}

          {/* <View style={styles.cashActivityCon}>
            <View style={styles.displayFlex}>
              <Text style={styles.cashActivityDarkText}>
                {strings.management.endTrackingSession}
              </Text>
              <Text style={styles.cashActivityDarkText}>
                {strings.management.leftDrawer}
              </Text>
            </View>
            <Spacer space={SH(4)} />
            <View style={styles.displayFlex}>
              <Text style={styles.cashActivityLightText}>
                {strings.management.allein}
              </Text>
              <Text style={styles.cashActivityLightText}>
                {strings.management.dateTime}
              </Text>
            </View>
          </View>
          <View style={styles.cashActivityCon}>
            <View style={styles.displayFlex}>
              <Text style={styles.cashActivityDarkText}>
                {strings.management.removeCash}
              </Text>
              <Text style={styles.cashActivityDarkText}>
                {strings.management.removeusd}
              </Text>
            </View>
            <Spacer space={SH(4)} />
            <View style={styles.displayFlex}>
              <Text style={styles.cashActivityLightText}>
                {strings.management.allein}
              </Text>
              <Text style={styles.cashActivityLightText}>
                {strings.management.dateTime}
              </Text>
            </View>
          </View>
          <View style={styles.cashActivityCon}>
            <View style={styles.displayFlex}>
              <Text style={styles.cashActivityDarkText}>
                {strings.management.countCash}
              </Text>
              <Text style={styles.cashActivityDarkText}>
                {strings.management.usd}
              </Text>
            </View>
            <View style={styles.displayFlex}>
              <Text style={styles.cashActivityRedText}>
                {strings.management.discrepancy}
              </Text>
              <Text style={styles.cashActivityRedText}>
                {strings.management.removeusd}
              </Text>
            </View>
            <Spacer space={SH(4)} />
            <View style={styles.displayFlex}>
              <Text style={styles.cashActivityLightText}>
                {strings.management.allein}
              </Text>
              <Text style={styles.cashActivityLightText}>
                {strings.management.dateTime}
              </Text>
            </View>
          </View>
          <View style={styles.cashActivityCon}>
            <View style={styles.displayFlex}>
              <Text
                style={[
                  styles.cashActivityDarkText,
                  { color: COLORS.darkGray },
                ]}
              >
                {strings.management.removeCash}
              </Text>
              <Text
                style={[
                  styles.cashActivityDarkText,
                  { color: COLORS.darkGray },
                ]}
              >
                {strings.management.removeusd}
              </Text>
            </View>
            <Spacer space={SH(4)} />
            <View style={styles.displayFlex}>
              <Text
                style={[
                  styles.cashActivityLightText,
                  { color: COLORS.darkGray },
                ]}
              >
                {strings.management.allein}
              </Text>
              <Text
                style={[
                  styles.cashActivityLightText,
                  { color: COLORS.darkGray },
                ]}
              >
                {strings.management.dateTime}
              </Text>
            </View>
            <Spacer space={SH(4)} />
            <View style={styles.displayFlex}>
              <Text
                style={[
                  styles.cashActivityLightText,
                  { color: COLORS.darkGray },
                ]}
              >
                {strings.management.breakFast}
              </Text>
            </View>
          </View>
          <View style={styles.cashActivityCon}>
            <View style={styles.displayFlex}>
              <Text style={styles.cashActivityDarkText}>
                {strings.management.startTrackingSession}
              </Text>
              <Text style={styles.cashActivityDarkText}>
                {strings.management.amountCount}
              </Text>
            </View>
            <Spacer space={SH(4)} />
            <View style={styles.displayFlex}>
              <Text style={styles.cashActivityLightText}>
                {strings.management.allein}
              </Text>
              <Text style={styles.cashActivityLightText}>
                {strings.management.dateTime}
              </Text>
            </View>
          </View> */}
          <Spacer space={SH(50)} />
        </View>
      </ScrollView>
    </View>
  );
}

export function TransactionDropDown({ selected }) {
  const [cityModalOpen, setCityModelOpen] = useState(false);
  const [cityModalValue, setCityModalValue] = useState(null);
  const [cityItems, setCityItems] = useState(transactionDataList);
  return (
    <DropDownPicker
      dropDownDirection="BOTTOM"
      ArrowUpIconComponent={({ style }) => <Image source={dropdown2} style={styles.dropDownIcon} />}
      ArrowDownIconComponent={({ style }) => (
        <Image source={dropdown2} style={styles.dropDownIcon} />
      )}
      style={styles.dropdown}
      containerStyle={[styles.containerStyle, { zIndex: Platform.OS === 'ios' ? 100 : 2 }]}
      listMode="SCROLLVIEW"
      // scrollViewProps={{
      //   nestedScrollEnabled: true,
      // }}
      dropDownContainerStyle={[
        styles.dropDownContainerStyle,
        { zIndex: Platform.OS === 'ios' ? 999 : 2, borderWidth: 1 },
      ]}
      open={cityModalOpen}
      value={cityModalValue}
      items={cityItems}
      setOpen={setCityModelOpen}
      setValue={setCityModalValue}
      setItems={setCityItems}
      placeholder={strings.management.transactionType}
      placeholderStyle={{ color: '#A7A7A7' }}
      onSelectItem={(item) => selected(item.value)}
    />
  );
}
