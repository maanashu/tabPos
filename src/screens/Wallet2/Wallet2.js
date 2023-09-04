import React, { useState } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import { COLORS } from '@/theme';
import { styles } from '@/screens/Wallet2/Wallet2.styles';
import { getCustomerDummy } from '@/constants/flatListData';
import { strings } from '@/localization';
import {
  bell,
  search_light,
  users,
  newCustomer,
  returnCustomer,
  onlineCutomer,
  walkinCustomer,
  wallet,
  scn,
  calendar1,
  calendar,
  calendarIcon,
  newCalendar,
  cloth,
  jbrCoin,
  cash,
  card2,
  cardIcon,
  cashIcon,
  jbricon,
} from '@/assets';
import { DaySelector, ScreenWrapper } from '@/components';
import { moderateScale, ms } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { useEffect } from 'react';
import { getCustomer, getOrderUser } from '@/actions/CustomersAction';
import { getCustomers } from '@/selectors/CustomersSelector';
import Graph from './Components/Graph';
import { getTotalTra } from '@/actions/WalletAction';
import { getWallet } from '@/selectors/WalletSelector';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export function Wallet2() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getWalletData = useSelector(getWallet);
  const getCustomerData = useSelector(getCustomers);
  const getTotalTraData = getWalletData?.getTotalTra;
  const getCustomerStatitics = getCustomerData?.getCustomers;
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const values =
    getCustomerStatitics === undefined
      ? Object.values(getCustomerDummy)
      : Object.values(getCustomerStatitics);
  const totalCustomer = values?.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  const [allUsers, setAllUsers] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [userData, setUserData] = useState();

  const [selectId, setSelectId] = useState(2);
  const [selectTime, setSelectTime] = useState({ name: 'week' });
  const time = selectTime?.name;
  const [dateformat, setDateformat] = useState('');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const onPresFun1 = (value) => {
    setShow(false);
    setDateformat('');
    setDate(new Date());
    dispatch(getTotalTra(value, sellerID, dateformat));
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getTotalTra(time, sellerID));
    }
  }, [isFocused]);

  const onChangeDate = (selectedDate) => {
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
    setSelectId(0);
    dispatch(getTotalTra(null, sellerID, newDateFormat));
  };
  const onCancelFun = () => {
    setShow(false);
    setDateformat('');
    setDate(new Date());
    setSelectId(2);
    dispatch(getTotalTra('week', sellerID, dateformat));
  };

  const aboutTransactionData = [
    {
      aboutTransaction: 'Total',
      price: getTotalTraData?.data?.total.toFixed(2) ?? '0',
      img: null,
      id: '1',
      type: 'all',
    },
    {
      aboutTransaction: 'JBR Coin',
      price: getTotalTraData?.data?.jbr.toFixed(2) ?? '0',
      img: jbricon,
      id: '2',
      type: 'jbr',
    },

    {
      aboutTransaction: 'Cash',
      price: getTotalTraData?.data?.cash.toFixed(2) ?? '0',
      img: cashIcon,
      id: '3',
    },
    {
      aboutTransaction: 'Card',
      price: getTotalTraData?.data?.card.toFixed(2) ?? '0',
      img: cardIcon,
      id: '4',
    },
  ];

  const bodyView = () => {
    return (
      <>
        <View style={styles.headerMainView}>
          <View style={styles.deliveryView}>
            <Image source={wallet} style={[styles.truckStyle, { marginLeft: 10 }]} />
            <Text style={styles.deliveryText}>{strings.wallet.wallet}</Text>
          </View>
          <View style={styles.deliveryView}>
            <TouchableOpacity>
              <Image source={bell} style={[styles.truckStyle, { right: 20 }]} />
            </TouchableOpacity>
            <View style={styles.searchView}>
              <View style={styles.flexAlign}>
                <Image source={search_light} style={styles.searchImage} />
                <TextInput
                  placeholder={strings.wallet.searchHere}
                  style={styles.textInputStyles}
                  placeholderTextColor={COLORS.darkGray}
                />
              </View>
              <Image source={scn} style={styles.scnStyle} />
            </View>
          </View>
        </View>

        <View style={styles.walletHomeBodyCon}>
          <View style={styles.displayFlex}>
            <Text style={styles.trancationHeading}>{strings.wallet.totalTransections}</Text>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <DaySelector
                  onPresFun={onPresFun1}
                  selectId={selectId}
                  setSelectId={setSelectId}
                  setSelectTime={setSelectTime}
                />
              </View>
              <TouchableOpacity style={styles.homeCalenaderBg} onPress={() => setShow(!show)}>
                <Image source={newCalendar} style={styles.calendarStyle} />
              </TouchableOpacity>
              <DateTimePickerModal
                mode={'date'}
                isVisible={show}
                onConfirm={onChangeDate}
                onCancel={() => onCancelFun()}
                maximumDate={new Date()}
              />
            </View>
          </View>
          <View>
            <FlatList
              data={aboutTransactionData}
              extraData={aboutTransactionData}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.custometrCon}>
                    <View style={styles.flexAlign}>
                      {index === 0 ? null : <Image source={item.img} style={styles.newCustomer} />}

                      <View style={{ paddingHorizontal: moderateScale(7) }}>
                        <Text style={styles.customerCount}>
                          {index === 1 ? '' : '$'}
                          {item.price}
                        </Text>
                        <Text style={styles.newCustomerHeading}>{item.aboutTransaction}</Text>
                      </View>
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
              horizontal
              contentContainerStyle={styles.contentContainerStyle}
              scrollEnabled={false}
            />
          </View>
          <View style={[styles.displayFlex, { marginTop: ms(20) }]}>
            <Text style={styles.transactions}>{strings.wallet.transactions}</Text>
            <TouchableOpacity style={styles.viewButtonCon}>
              <Text style={styles.viewAll}>{strings.reward.viewAll}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Graph />
          </View>
        </View>
      </>
    );
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>{bodyView()}</View>
    </ScreenWrapper>
  );
}
