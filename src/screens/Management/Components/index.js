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
import { allien, calendar1, dropdown2, roundCalender } from '@/assets';
import { strings } from '@/localization';
import { styles } from '@/screens/Management/Management.styles';
import { Spacer, TableDropdown } from '@/components';
import { Table } from 'react-native-table-component';
const windowWidth = Dimensions.get('window').width;
import DropDownPicker from 'react-native-dropdown-picker';
import { transactionDataList } from '@/constants/staticData';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

export function SessionHistoryTable({ tableTouchHandler }) {
  const [date, setDate] = useState(new Date());
  const [dateformat, setDateformat] = useState('');
  const [show, setShow] = useState(false);
  const onChangeDate = selectedDate => {
    const currentDate = moment().format('MM/DD/YYYY');
    const selected = moment(selectedDate).format('MM/DD/YYYY');
    if (currentDate === selected) {
      setShow(false);
      const fullDate = new Date(moment(selectedDate).subtract(21, 'years'));
      const changedDate = moment(fullDate).format('MM / DD / YYYY');
      const newDateFormat = moment(fullDate).format('YYYY-MM-DD');
      setDateformat(newDateFormat);
      setDate(changedDate);
    } else {
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
    }
  };
  return (
    <View>
      <Text style={styles.sessionHistory}>
        {strings.management.sessionHistory}
      </Text>
      <Spacer space={SH(20)} />
      <View style={styles.datePickerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.datePickerCon}
            onPress={() => setShow(!show)}
          >
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
            onCancel={() => setShow(false)}
            maximumDate={new Date(moment().subtract(21, 'years'))}
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
              <View style={{ flexDirection: 'row', width: windowWidth * 0.25 }}>
                <Text style={styles.text}>#</Text>
                <Text
                  style={[
                    styles.text,
                    { paddingHorizontal: moderateScale(10) },
                  ]}
                >
                  Date
                </Text>
              </View>
              <View style={styles.dateHeadAlign}>
                <Text style={styles.text}>Ended By</Text>
                <Text style={styles.text}>Session Started</Text>
                <Text style={styles.text}>Added cash</Text>
                <Text style={styles.text}>Removed cash</Text>
                <Text style={styles.text}>Counted cash</Text>
                <Text style={[styles.text, { paddingRight: 25 }]}>
                  Session Ended
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.tableDataCon}
            onPress={tableTouchHandler}
          >
            <View style={styles.displayFlex}>
              <View style={{ flexDirection: 'row', width: windowWidth * 0.25 }}>
                <Text style={[styles.usertableRowText, { textAlign: 'left' }]}>
                  1
                </Text>
                <View style={{ paddingHorizontal: moderateScale(10) }}>
                  <Text style={styles.usertableRowText}>Jun 21, 2022</Text>
                  <Text
                    style={[styles.usertableRowText, { textAlign: 'left' }]}
                  >
                    2:28 PM
                  </Text>
                </View>
              </View>
              <View style={styles.dateTimeAlign}>
                <View style={styles.flexAlign}>
                  <Image source={allien} style={styles.allienpic} />
                  <Text
                    style={[
                      styles.usertableRowText,
                      { paddingHorizontal: moderateScale(3) },
                    ]}
                  >
                    Allein
                  </Text>
                </View>
                <Text style={styles.usertableRowText}>$0.00</Text>
                <Text style={styles.usertableRowText}>$6,590.00</Text>
                <Text style={styles.usertableRowText}>$1,350.00</Text>
                <Text style={styles.usertableRowText}>$5,200.00</Text>
                <Text
                  style={[styles.usertableRowText, { color: COLORS.orange }]}
                >
                  -$40.00
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Table>
      </View>
    </View>
  );
}
export function SummaryHistory({ historyHeader }) {
  return (
    <View style={historyHeader ? styles.bodyContainer : styles.bodyContainer2}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer space={SH(20)} />
        <Text style={styles.allCashText}>{strings.management.allCash}</Text>
        <View>
          <View style={styles.totalCashHeader}>
            <Text style={styles.sectionListHeader}>
              {strings.management.totalCashIn}
            </Text>
            <Text style={styles.sectionListHeader}>
              {strings.management.usd}
            </Text>
          </View>
          <View style={styles.totalCashData}>
            <Text style={styles.sectionListData}>
              {strings.management.sale}
            </Text>
            <Text style={styles.sectionListData}>{strings.management.usd}</Text>
          </View>
          <View style={styles.totalCashData}>
            <Text style={styles.sectionListData}>
              {strings.management.manual}
            </Text>
            <Text style={styles.sectionListData}>{strings.management.usd}</Text>
          </View>

          <View style={styles.totalCashHeader}>
            <Text style={styles.sectionListHeader}>
              {strings.management.totalCashOut}
            </Text>
            <Text style={styles.sectionListHeader}>
              {strings.management.usd}
            </Text>
          </View>
          <View style={styles.totalCashData}>
            <Text style={styles.sectionListData}>
              {strings.management.deliveryCharge}
            </Text>
            <Text style={styles.sectionListData}>{strings.management.usd}</Text>
          </View>
          <View style={styles.totalCashData}>
            <Text style={styles.sectionListData}>
              {strings.management.shippingCharge}
            </Text>
            <Text style={styles.sectionListData}>{strings.management.usd}</Text>
          </View>
          <View style={styles.totalCashData}>
            <Text style={styles.sectionListData}>
              {strings.management.refund}
            </Text>
            <Text style={styles.sectionListData}>{strings.management.usd}</Text>
          </View>
          <View style={styles.totalCashData}>
            <Text style={styles.sectionListData}>
              {strings.management.manual}
            </Text>
            <Text style={styles.sectionListData}>{strings.management.usd}</Text>
          </View>
          <View style={styles.netPaymentHeader}>
            <Text style={styles.sectionListHeader}>
              {strings.management.netPayment}
            </Text>
            <Text style={styles.sectionListHeader}>
              {strings.management.totalCash}
            </Text>
          </View>
          <Spacer space={SH(60)} />
          <Text style={styles.cashActivity}>
            {strings.management.cashActivity}
          </Text>
          <Spacer space={SH(20)} />
          <View style={styles.cashActivityCon}>
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
          </View>
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
      dropDownDirection="TOP"
      ArrowUpIconComponent={({ style }) => (
        <Image source={dropdown2} style={styles.dropDownIcon} />
      )}
      ArrowDownIconComponent={({ style }) => (
        <Image source={dropdown2} style={styles.dropDownIcon} />
      )}
      style={styles.dropdown}
      containerStyle={[
        styles.containerStyle,
        { zIndex: Platform.OS === 'ios' ? 100 : 2 },
      ]}
      listMode="SCROLLVIEW"
      scrollViewProps={{
        nestedScrollEnabled: true,
      }}
      dropDownContainerStyle={styles.dropDownContainerStyle}
      open={cityModalOpen}
      value={cityModalValue}
      items={cityItems}
      setOpen={setCityModelOpen}
      setValue={setCityModalValue}
      setItems={setCityItems}
      placeholder={strings.management.transactionType}
      placeholderStyle={{ color: '#A7A7A7' }}
      onSelectItem={item => selected(item.value)}
    />
  );
}
