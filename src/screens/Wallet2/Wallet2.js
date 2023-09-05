import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SF, SH } from '@/theme';
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
  backArrow,
  Union,
  mask,
  maskRight,
  unionRight,
  dropdown2,
  tableArrow,
} from '@/assets';
import moment from 'moment';
import { DaySelector, InvoiceDetail, ScreenWrapper, Spacer, TableDropdown } from '@/components';
import { moderateScale, ms } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { useEffect } from 'react';
import { getCustomer, getOrderUser } from '@/actions/CustomersAction';
import { getCustomers } from '@/selectors/CustomersSelector';
import Graph from './Components/Graph';
import { getTotakTraDetail, getTotalTra } from '@/actions/WalletAction';
import { getWallet } from '@/selectors/WalletSelector';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table } from 'react-native-table-component';
import { TYPES } from '@/Types/WalletTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { useRef } from 'react';
import { getOrderData } from '@/actions/AnalyticsAction';
const windowHeight = Dimensions.get('window').height;
export function Wallet2() {
  const mapRef = useRef(null);
  const isFocused = useIsFocused();
  const [invoiceDetail, setInvoiceDetail] = useState(false);
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getWalletData = useSelector(getWallet);
  const getCustomerData = useSelector(getCustomers);
  const getTotalTraData = getWalletData?.getTotalTra;
  const getCustomerStatitics = getCustomerData?.getCustomers;
  const getTotalTraDetail = getWalletData?.getTotakTraDetail;
  const transactionTypeArray = getWalletData?.getTotalTraType;
  const [orderModel, setOrderModel] = useState(false);

  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const values =
    getCustomerStatitics === undefined
      ? Object.values(getCustomerDummy)
      : Object.values(getCustomerStatitics);
  const totalCustomer = values?.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(null);
  const [paginationModalItems, setPaginationModalItems] = useState([
    { label: '10', value: '10' },
    { label: '30', value: '30' },
    { label: '50', value: '50' },
    { label: '70', value: '70' },
  ]);
  const [allUsers, setAllUsers] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [userData, setUserData] = useState();
  const [selectTime2, setSelectTime2] = useState({ name: 'week' });
  const [selectId, setSelectId] = useState(2);
  const [selectId2, setSelectId2] = useState(2);
  const [selectTime, setSelectTime] = useState({ name: 'week' });
  const time = selectTime?.name;
  const [dateformat, setDateformat] = useState('');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [historytype, setHistorytype] = useState('all');
  const [walletHome, setWalletHome] = useState(true);
  const [weeklyTransaction, setWeeklyTrasaction] = useState(false);
  const onPresFun1 = (value) => {
    setShow(false);
    setDateformat('');
    setDate(new Date());
    dispatch(getTotalTra(value, sellerID, dateformat));
  };
  const onPresFun2 = (value) => {
    dispatch(getTotakTraDetail(value, sellerID, 'all'));
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getTotalTra(time, sellerID));
    }
  }, [isFocused]);
  const isTotalTraLoad = useSelector((state) => isLoadingSelector([TYPES.GET_TOTAL_TRA], state));
  const isTotalTradetail = useSelector((state) =>
    isLoadingSelector([TYPES.GET_TOTAL_TRA_DETAIL], state)
  );
  const isTotalTraType = useSelector((state) =>
    isLoadingSelector([TYPES.GET_TOTAL_TRA_TYPE], state)
  );
  let desiredModeOfPayment = historytype; // Replace with the desired mode_of_payment value or "all"
  let filteredData;

  if (desiredModeOfPayment === 'all') {
    filteredData = getTotalTraDetail;
  } else {
    filteredData = getTotalTraDetail.filter(
      (item) => item.mode_of_payment === desiredModeOfPayment
    );
  }
  const statusFun = (status) => {
    switch (status) {
      case 0:
        return 'Review';
        break;
      case 1:
        return 'Accepted';
        break;
      case 2:
        return 'Prepare';
        break;
      case 3:
        return 'Ready Pickup';
        break;
      case 4:
        return 'Assign';
        break;
      case 5:
        return 'Pickup';
        break;
      case 6:
        return 'Delivered';
        break;
      case 7:
        return 'Cancelled';
        break;
      case 8:
        return 'Rejected';
        break;
    }
  };
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
    if (weeklyTransaction) {
      setSelectId2(0);
      dispatch(getTotakTraDetail(newDateFormat, sellerID, 'all'));
    } else {
      setSelectId(0);
      dispatch(getTotalTra(null, sellerID, newDateFormat));
    }
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
  const allTransactionItem = ({ item }) => {
    const borderColor =
      item.mode_of_payment === transcationTypeId ? COLORS.primary : COLORS.solidGrey;
    const color = item.mode_of_payment === transcationTypeId ? COLORS.primary : COLORS.dark_grey;
    const fontFamily = item.mode_of_payment === transcationTypeId ? Fonts.SemiBold : Fonts.Regular;
    return (
      <TransactionSelectItem
        item={item}
        onPress={() => {
          setTranscationTypeId(item.mode_of_payment),
            setTransaction(item),
            onPresFun3(item.mode_of_payment);
        }}
        borderColor={borderColor}
        color={color}
        fontFamily={fontFamily}
      />
    );
  };

  const weeklyTraRemoveHandler = () => {
    setWeeklyTrasaction(false);
    setWalletHome(true);
  };
  const closeHandler = () => {
    setInvoiceDetail(false);
    setWeeklyTrasaction(true);
  };
  const bodyView = () => {
    if (invoiceDetail) {
      return (
        <InvoiceDetail
          {...{
            mapRef,
            closeHandler,
          }}
        />
      );
    } else if (walletHome) {
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
                <TouchableOpacity
                  style={[
                    styles.homeCalenaderBg,
                    {
                      backgroundColor: selectId == 0 ? COLORS.primary : COLORS.textInputBackground,
                    },
                  ]}
                  onPress={() => setShow(!show)}
                >
                  <Image
                    source={newCalendar}
                    style={[
                      styles.calendarStyle,
                      { tintColor: selectId == 0 ? COLORS.white : COLORS.darkGray },
                    ]}
                  />
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
                        {index === 0 ? null : (
                          <Image source={item.img} style={styles.newCustomer} />
                        )}

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
              <TouchableOpacity
                onPress={() => {
                  setWeeklyTrasaction(true), setWalletHome(false);
                }}
                style={styles.viewButtonCon}
              >
                <Text style={styles.viewAll}>{strings.reward.viewAll}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Graph />
            </View>
          </View>
        </>
      );
    } else if (weeklyTransaction) {
      return (
        <View style={{ height: windowHeight * 0.95 }}>
          <View style={styles.headerMainView}>
            <TouchableOpacity style={styles.backButtonCon} onPress={weeklyTraRemoveHandler}>
              <Image source={backArrow} style={styles.backButtonArrow} />
              <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
            </TouchableOpacity>
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
          {/* <ScrollView> */}
          <View style={styles.walletTranCon}>
            <View style={styles.displayFlex}>
              <Text style={styles.trancationHeading}>{strings.wallet.totalTransections}</Text>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <DaySelector
                    onPresFun={onPresFun2}
                    selectId={selectId2}
                    setSelectId={setSelectId2}
                    setSelectTime={setSelectTime2}
                  />
                </View>
                <TouchableOpacity
                  style={[
                    styles.homeCalenaderBg,
                    {
                      backgroundColor: selectId2 == 0 ? COLORS.primary : COLORS.textInputBackground,
                    },
                  ]}
                  onPress={() => setShow(!show)}
                >
                  <Image
                    source={newCalendar}
                    style={[
                      styles.calendarStyle,
                      { tintColor: selectId2 == 0 ? COLORS.white : COLORS.darkGray },
                    ]}
                  />
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
          </View>
          <Spacer space={SH(10)} />
          <View style={[styles.allTypeCon]}>
            <FlatList
              data={transactionTypeArray}
              extraData={transactionTypeArray}
              renderItem={allTransactionItem}
              keyExtractor={(item) => item.mode_of_payment}
              horizontal
            />
          </View>
          {/* </ScrollView> */}
          <View style={styles.orderTypeCon}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.datePickerCon}>
                <Image source={calendar1} style={styles.calendarStyle} />
                <Text style={styles.datePlaceholder}>Date</Text>
              </View>

              <View style={{ marginHorizontal: moderateScale(10) }}>
                <TableDropdown placeholder="Status" />
              </View>
              <>
                <TableDropdown placeholder="Order type" />
              </>
            </View>
          </View>
          <View style={[styles.jbrTypeCon, { zIndex: -2 }]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <Text style={[styles.paginationCount, { fontSize: 12 }]}>Showing Results</Text>
              <View style={{ marginHorizontal: moderateScale(10) }}>
                <DropDownPicker
                  ArrowUpIconComponent={({ style }) => (
                    <Image source={dropdown2} style={styles.dropDownIconPagination} />
                  )}
                  ArrowDownIconComponent={({ style }) => (
                    <Image source={dropdown2} style={styles.dropDownIconPagination} />
                  )}
                  style={styles.dropdown}
                  containerStyle={[
                    styles.containerStylePagination,
                    { zIndex: Platform.OS === 'ios' ? 20 : 1 },
                  ]}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  labelStyle={styles.labelStyle}
                  selectedItemLabelStyle={styles.selectedItemLabelStyle}
                  open={paginationModalOpen}
                  value={paginationModalValue}
                  items={paginationModalItems}
                  setOpen={setPaginationModalOpen}
                  setValue={setPaginationModalValue}
                  setItems={setPaginationModalItems}
                  placeholder="50"
                  placeholderStyle={styles.placeholderStylePagination}
                />
              </View>
              <View style={styles.unionCon}>
                <Image source={Union} style={styles.unionStyle} />
              </View>
              <View style={[styles.unionCon, { marginLeft: 7 }]}>
                <Image source={mask} style={styles.unionStyle} />
              </View>
              <Text style={styles.paginationCount}>{strings.wallet.paginationCount}</Text>
              <View style={[styles.unionCon, styles.unionConWhite, { marginRight: 7 }]}>
                <Image source={maskRight} style={styles.unionStyle} />
              </View>
              <View style={[styles.unionCon, styles.unionConWhite]}>
                <Image source={unionRight} style={styles.unionStyle} />
              </View>
            </View>
          </View>
          <View style={{ zIndex: -9 }}>
            <Table>
              <View style={styles.tableDataHeaderCon}>
                <View style={styles.displayFlex}>
                  <View style={styles.tableHeaderLeft}>
                    <Text style={styles.tableTextHeaFirst}>#</Text>
                    <Text style={[styles.tableTextHea, { marginLeft: 30 }]}>Date</Text>
                  </View>
                  <View style={styles.tableHeaderRight}>
                    <Text style={styles.tableTextHea}>Transaction ID</Text>

                    <View style={styles.flexAlign}>
                      {/* <Text style={styles.tableTextHea}>Employee</Text> */}
                      <Text numberOfLines={1} style={styles.tableTextHea}>
                        Transaction type
                      </Text>
                      <Image source={tableArrow} style={styles.tableArrow} />
                    </View>
                    <View style={styles.flexAlign}>
                      {/* <Text style={styles.tableTextHea}>Customer</Text> */}

                      <Text style={styles.tableTextHea}>Payment Method</Text>
                      <Image source={tableArrow} style={styles.tableArrow} />
                    </View>

                    {/* <Text style={styles.tableTextHea}> */}
                    {/* {historytype == 'jbr' ? 'JOBR' : 'Amount'} */}

                    {/* </Text> */}
                    <Text style={styles.tableTextHea}>Amount</Text>
                    <Text style={[styles.tableTextHea, { marginRight: -5 }]}>Refunded</Text>

                    <Text style={[styles.tableTextHea, { paddingHorizontal: 25 }]}>Status</Text>
                  </View>
                </View>
              </View>

              <View style={styles.tableHeight}>
                <ScrollView>
                  {isTotalTradetail ? (
                    <View style={{ marginTop: 100 }}>
                      <ActivityIndicator size="large" color={COLORS.indicator} />
                    </View>
                  ) : filteredData?.length === 0 ? (
                    <View style={{ marginTop: 80 }}>
                      <Text style={styles.userNotFound}>Order not found</Text>
                    </View>
                  ) : (
                    filteredData?.map((item, index) => (
                      <TouchableOpacity
                        style={[styles.tableDataCon, { zIndex: -9 }]}
                        key={index}
                        onPress={() => {
                          setInvoiceDetail(true);
                          dispatch(getOrderData(item?.id));
                        }}
                      >
                        <View style={styles.displayFlex}>
                          <View style={styles.tableHeaderLeft}>
                            <Text style={styles.tableTextDataFirst}>{index + 1}</Text>
                            <View
                              style={{
                                flexDirection: 'column',
                                marginLeft: 30,
                              }}
                            >
                              <Text style={styles.tableTextData}>
                                {item.created_at
                                  ? moment(item.created_at).format('ll')
                                  : 'date not found'}
                              </Text>
                              <Text style={[styles.tableTextData, { color: COLORS.gerySkies }]}>
                                {item.created_at
                                  ? moment(item.created_at).format('h:mm A')
                                  : 'date not found'}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.tableHeaderRight}>
                            <Text style={[styles.tableTextData, { fontSize: SF(12) }]}>
                              {item.transaction_id ?? null}
                            </Text>
                            <Text style={styles.tableTextData}>
                              {item?.seller_details?.firstname}
                              {/* {capitalizeFirstLetter(item.mode_of_payment=="jbr"?"JOBR Coin":item.mode_of_payment) ?? null} */}
                            </Text>
                            <Text style={styles.tableTextData}>
                              {item?.user_details?.firstname}
                              {/* {capitalizeFirstLetter(item.mode_of_payment=="jbr"?"JOBR Coin":item.mode_of_payment) ?? null} */}
                            </Text>
                            <Text style={styles.tableTextData}>${item?.payable_amount ?? '0'}</Text>

                            <Text style={styles.tableTextData}>
                              {item.refunded_amount !== null ? '$' + item.refunded_amount : '$0'}
                            </Text>
                            <View style={{ width: SF(90) }}>
                              <Text style={styles.tableTextDataCom}>{statusFun(item.status)}</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))
                  )}
                </ScrollView>
              </View>
            </Table>
          </View>

          <Spacer space={SH(100)} />
        </View>
      );
    }
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>{bodyView()}</View>
    </ScreenWrapper>
  );
}
