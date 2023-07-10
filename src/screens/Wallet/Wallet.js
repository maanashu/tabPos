import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { COLORS, SH, SW, SF } from '@/theme';
import { styles } from '@/screens/Wallet/Wallet.styles';
import { strings } from '@/localization';
import {
  notifications,
  search_light,
  wallet2,
  transactionChart,
  rightBack,
  backArrow,
  calendar1,
  dropdown2,
  Union,
  mask,
  maskRight,
  unionRight,
  Fonts,
  jbrCoin,
  cash,
  card2,
  tableArrow,
} from '@/assets';
import {
  DaySelector,
  ScreenWrapper,
  Spacer,
  TableDropdown,
} from '@/components';
import { moderateScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table } from 'react-native-table-component';
import { OrderList, DetailShipping, TrackingModule } from './Components';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import {
  getTotakTraDetail,
  getTotalTra,
  getTotalTraType,
} from '@/actions/WalletAction';
import { getWallet } from '@/selectors/WalletSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/WalletTypes';
import moment from 'moment';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';

const windowHeight = Dimensions.get('window').height;

moment.suppressDeprecationWarnings = true;

export function Wallet() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getWalletData = useSelector(getWallet);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const getTotalTraData = getWalletData?.getTotalTra;
  const getTotalTraDetail = getWalletData?.getTotakTraDetail;
  const transactionTypeArray = getWalletData?.getTotalTraType;
  const [weeklyTransaction, setWeeklyTrasaction] = useState(false);
  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(null);
  const [paginationModalItems, setPaginationModalItems] = useState([
    { label: '10', value: '10' },
    { label: '30', value: '30' },
    { label: '50', value: '50' },
    { label: '70', value: '70' },
  ]);
  const [orderModel, setOrderModel] = useState(false);
  const [detailShipping, setDetailShipping] = useState(false);
  const [transcationTypeId, setTranscationTypeId] = useState('all');
  const [selectTime, setSelectTime] = useState({ name: 'week' });
  const [selectTime2, setSelectTime2] = useState({ name: 'week' });
  const [selectId, setSelectId] = useState(2);
  const [selectId2, setSelectId2] = useState(2);
  const [orderData, setOrderData] = useState();
  const [tracking, setTracking] = useState(false);
  const [tranAdd, setTranAdd] = useState('');
  const [transaction, setTransaction] = useState({ mode_of_payment: 'all' });
  const transactionType = transaction?.mode_of_payment;
  const time = selectTime?.name;
  const time2 = selectTime2?.value;
  const time3 = transaction?.mode_of_payment;
  const onPresFun1 = value => {
    dispatch(getTotalTra(value, sellerID));
  };
  const onPresFun2 = value => {
    dispatch(getTotakTraDetail(value, sellerID, transactionType));
  };
  const onPresFun3 = mode_of_payment => {
    dispatch(getTotakTraDetail(time2, sellerID, mode_of_payment));
  };

  const aboutTransactionData = [
    {
      aboutTransaction: 'JBR COIN',
      price: getTotalTraData?.jbr ?? '0',
      img: jbrCoin,
      id: '1',
    },
    {
      aboutTransaction: 'CASH',
      price: getTotalTraData?.cash ?? '0',
      img: cash,
      id: '2',
    },
    {
      aboutTransaction: 'CARD',
      price: getTotalTraData?.card ?? '0',
      img: card2,
      id: '3',
    },
  ];
  const tipsData = [
    {
      heading: 'Tips',
      price: getTotalTraData?.tips ?? '0',
      id: '1',
    },
    {
      heading: 'Delivery Charge',
      price: getTotalTraData?.delivery_charge ?? '0',
      id: '2',
    },
    {
      heading: 'Shipping Charge',
      price: getTotalTraData?.shipping_charge ?? '0',
      id: '3',
    },
  ];

  useEffect(() => {
    if (isFocused) {
      dispatch(getTotalTra(time, sellerID));
    }
  }, [isFocused]);

  const isTotalTraLoad = useSelector(state =>
    isLoadingSelector([TYPES.GET_TOTAL_TRA], state)
  );
  const isTotalTradetail = useSelector(state =>
    isLoadingSelector([TYPES.GET_TOTAL_TRA_DETAIL], state)
  );
  const isTotalTraType = useSelector(state =>
    isLoadingSelector([TYPES.GET_TOTAL_TRA_TYPE], state)
  );
  const statusFun = status => {
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

  const weeklyTraRemoveHandler = () => {
    setWeeklyTrasaction(false);
  };
  const orderModelHandler = () => {
    setOrderModel(!orderModel);
  };
  const orderModelBackHandler = () => {
    setOrderModel(false);
    setWeeklyTrasaction(true);
  };
  const checkOutHandler = () => {
    setDetailShipping(!detailShipping);
    setOrderModel(false);
  };
  const shippingDeliverRemoveHandler = () => {
    setDetailShipping(false);
    setOrderModel(true);
  };
  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {weeklyTransaction ? (
          <TouchableOpacity
            style={styles.backButtonCon}
            onPress={weeklyTraRemoveHandler}
          >
            <Image source={backArrow} style={styles.backButtonArrow} />
            <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.deliveryView}>
            <Image source={wallet2} style={styles.truckStyle} />
            <Text style={styles.deliveryText}>{strings.wallet.wallet}</Text>
          </View>
        )}

        <View style={styles.deliveryView}>
          <TouchableOpacity
            onPress={() =>
              navigate(NAVIGATION.notificationsList, {
                screen: NAVIGATION.wallet,
              })
            }
          >
            <Image
              source={notifications}
              style={[styles.truckStyle, { right: 20 }]}
            />
          </TouchableOpacity>
          <View style={styles.searchView}>
            <Image source={search_light} style={styles.searchImage} />
            <TextInput
              placeholder={strings.deliveryOrders.search}
              style={styles.textInputStyles}
              placeholderTextColor={COLORS.darkGray}
            />
          </View>
        </View>
      </View>
    );
  };
  const aboutTransactionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.jbrCoinCon}
      onPress={() => (
        setWeeklyTrasaction(true),
        dispatch(getTotakTraDetail('week', sellerID, transactionType)),
        dispatch(getTotalTraType())
      )}
    >
      <Image source={item.img} style={styles.jbrCoinStyle} />
      <Spacer space={SH(10)} />
      <View style={styles.displayFlex}>
        <Text style={styles.jbrCoinheading}>{item.aboutTransaction}</Text>
        <Image source={rightBack} style={styles.arrowStyle} />
      </View>
      <Text style={styles.jbrCoinPrice}>
        {isTotalTraLoad ? null : '$'}
        {isTotalTraLoad ? (
          <ActivityIndicator
            size="small"
            color={COLORS.primary}
            style={styles.indicatorstyle}
          />
        ) : (
          item.price
        )}
      </Text>
    </TouchableOpacity>
  );
  const tipsItem = ({ item }) => (
    <View style={[styles.jbrCoinCon, styles.jbrCoinCon2]}>
      <View style={styles.displayFlex}>
        <Text style={styles.jbrCoinheading}>{item.heading}</Text>
        <Image source={rightBack} style={styles.arrowStyle} />
      </View>
      <Text style={styles.jbrCoinPrice}>
        {isTotalTraLoad ? null : '$'}
        {isTotalTraLoad ? (
          <ActivityIndicator
            size="small"
            color={COLORS.primary}
            style={styles.indicatorstyle}
          />
        ) : (
          item.price
        )}
      </Text>
    </View>
  );

  const TransactionSelectItem = ({
    item,
    onPress,
    borderColor,
    color,
    fontFamily,
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.allJbrCon, { borderColor }]}
    >
      {isTotalTraType ? (
        <ActivityIndicator size="small" color={COLORS.primary} />
      ) : (
        <Text style={[styles.allJbrText, { color, fontFamily }]}>
          {item.mode_of_payment} ({item.count})
        </Text>
      )}
    </TouchableOpacity>
  );

  const allTransactionItem = ({ item }) => {
    const borderColor =
      item.mode_of_payment === transcationTypeId
        ? COLORS.primary
        : COLORS.solidGrey;
    const color =
      item.mode_of_payment === transcationTypeId
        ? COLORS.primary
        : COLORS.dark_grey;
    const fontFamily =
      item.mode_of_payment === transcationTypeId
        ? Fonts.SemiBold
        : Fonts.Regular;
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

  const changeView = () => {
    if (tracking) {
      return (
        <TrackingModule
          trackignBackHandler={() => (
            setTracking(false), setDetailShipping(true)
          )}
          OrderHeaderStatus={statusFun(orderData?.status)}
          orderData={orderData}
          orderStatus={orderData?.status}
        />
      );
    } else if (detailShipping) {
      return (
        <DetailShipping
          shippingDeliverRemoveHandler={shippingDeliverRemoveHandler}
          orderHeadStatus={statusFun(orderData?.status)}
          orderData={orderData}
          trackinghandler={() => (setDetailShipping(false), setTracking(true))}
        />
      );
    } else if (orderModel) {
      return (
        <OrderList
          orderModelBackHandler={orderModelBackHandler}
          checkOutHandler={checkOutHandler}
          listOfItemArray={orderData?.order_details}
          orderHeadStatus={statusFun(orderData?.status)}
          orderData={orderData}
        />
      );
    } else if (weeklyTransaction) {
      return (
        <View style={{ height: windowHeight * 0.95 }}>
          {customHeader()}
          {/* <ScrollView> */}
          <View style={styles.walletTranCon}>
            <View style={styles.displayFlex}>
              <Text style={styles.trancationHeading}>
                {strings.wallet.totalTransections}
                <Text style={styles.totalTranStyle}>
                  {strings.wallet.transationPrice}
                  {getTotalTraData?.total?.toFixed(2) ?? '0'}
                </Text>
              </Text>
              <View>
                <DaySelector
                  onPresFun={onPresFun2}
                  selectId={selectId2}
                  setSelectId={setSelectId2}
                  setSelectTime={setSelectTime2}
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
              keyExtractor={item => item.mode_of_payment}
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
              <Text style={[styles.paginationCount, { fontSize: 12 }]}>
                Showing Results
              </Text>
              <View style={{ marginHorizontal: moderateScale(10) }}>
                <DropDownPicker
                  ArrowUpIconComponent={({ style }) => (
                    <Image
                      source={dropdown2}
                      style={styles.dropDownIconPagination}
                    />
                  )}
                  ArrowDownIconComponent={({ style }) => (
                    <Image
                      source={dropdown2}
                      style={styles.dropDownIconPagination}
                    />
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
              <Text style={styles.paginationCount}>
                {strings.wallet.paginationCount}
              </Text>
              <View
                style={[
                  styles.unionCon,
                  styles.unionConWhite,
                  { marginRight: 7 },
                ]}
              >
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
                    <Text style={[styles.tableTextHea, { marginLeft: 30 }]}>
                      Date
                    </Text>
                  </View>
                  <View style={styles.tableHeaderRight}>
                    <Text style={styles.tableTextHea}>Transection Id</Text>

                    <View style={styles.flexAlign}>
                      <Text style={styles.tableTextHea}>Transection type</Text>
                      <Image source={tableArrow} style={styles.tableArrow} />
                    </View>
                    <View style={styles.flexAlign}>
                      <Text style={styles.tableTextHea}>Mode of payment</Text>
                      <Image source={tableArrow} style={styles.tableArrow} />
                    </View>

                    <Text style={styles.tableTextHea}>Cash In</Text>
                    <Text style={styles.tableTextHea}>Cash Out</Text>
                    <Text style={[styles.tableTextHea, { marginRight: -2 }]}>
                      Status
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.tableHeight}>
                <ScrollView>
                  {isTotalTradetail ? (
                    <View style={{ marginTop: 100 }}>
                      <ActivityIndicator
                        size="large"
                        color={COLORS.indicator}
                      />
                    </View>
                  ) : getTotalTraDetail?.length === 0 ? (
                    <View style={{ marginTop: 80 }}>
                      <Text style={styles.userNotFound}>Order not found</Text>
                    </View>
                  ) : (
                    getTotalTraDetail?.map((item, index) => (
                      <TouchableOpacity
                        style={[styles.tableDataCon, { zIndex: -9 }]}
                        key={index}
                        onPress={() => (
                          setOrderModel(!orderModel), setOrderData(item)
                        )}
                      >
                        <View style={styles.displayFlex}>
                          <View style={styles.tableHeaderLeft}>
                            <Text style={styles.tableTextDataFirst}>
                              {index + 1}
                            </Text>
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
                              <Text
                                style={[
                                  styles.tableTextData,
                                  { color: COLORS.gerySkies },
                                ]}
                              >
                                {item.created_at
                                  ? moment(item.created_at).format('h : mm')
                                  : 'date not found'}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.tableHeaderRight}>
                            <Text
                              numberOfLines={1}
                              style={[
                                styles.tableTextData,
                                { fontSize: SF(12) },
                              ]}
                            >
                              {item.transaction_id ?? null}
                            </Text>
                            <Text style={styles.tableTextData}>
                              {item.mode_of_payment ?? null}
                            </Text>
                            <Text style={styles.tableTextData}>
                              {item.mode_of_payment ?? null}
                            </Text>
                            <Text style={styles.tableTextData}>
                              ${item.payable_amount ?? '0'}
                            </Text>
                            <Text style={styles.tableTextData}>{'$0'}</Text>
                            <View>
                              <Text style={styles.tableTextDataCom}>
                                {statusFun(item.status)}
                              </Text>
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
    } else {
      return (
        <View style={{ marginHorizontal: moderateScale(10) }}>
          {customHeader()}
          <View>
            <View style={styles.walletMainCon}>
              <Spacer space={SH(10)} />
              <View style={styles.displayFlex}>
                <Text style={styles.trancationHeading}>
                  {strings.wallet.totalTransections}
                </Text>
                <View>
                  <DaySelector
                    onPresFun={onPresFun1}
                    selectId={selectId}
                    setSelectId={setSelectId}
                    setSelectTime={setSelectTime}
                  />
                </View>
              </View>
              <Spacer space={SH(5)} />
              <Text style={styles.transationPrice}>
                {strings.wallet.transationPrice}
                {getTotalTraData?.total?.toFixed(2) ?? '0'}
              </Text>
              <Spacer space={SH(10)} />
              <View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={aboutTransactionData}
                  extraData={aboutTransactionData}
                  renderItem={aboutTransactionItem}
                  keyExtractor={item => item.id}
                  horizontal
                  contentContainerStyle={styles.contentContainer}
                  scrollEnabled={false}
                />
              </View>
              <Spacer space={SH(17)} />
              <View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={tipsData}
                  renderItem={tipsItem}
                  keyExtractor={item => item.id}
                  horizontal
                  contentContainerStyle={styles.contentContainer}
                  scrollEnabled={false}
                />
              </View>

              <Spacer space={SH(10)} />
              <Image
                source={transactionChart}
                style={styles.transactionChartStyle}
              />
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>{changeView()}</View>
    </ScreenWrapper>
  );
}
