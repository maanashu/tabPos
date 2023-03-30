import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { COLORS, SH, SW, SF } from '@/theme';
import { styles } from '@/screens/Customers/Customers.styles';
import {
  newCustomerData,
  newCustomerDataLoader,
} from '@/constants/flatListData';
import { strings } from '@/localization';
import {
  notifications,
  search_light,
  leftBack,
  customersGraph,
  location,
  crossButton,
  ticket,
  box,
  dropRight,
  users,
  Fonts,
  willis,
  deliverCheck,
  track,
  blankRadio,
  movingArrow,
  fillRadio,
  movingArrowBlue,
  angela2,
  contact,
  userImage,
  newCustomer,
  returnCustomer,
  onlineCutomer,
  blueLocation,
  shop_light,
  greyRadioArr,
  radioArrBlue,
  cusBarClr,
} from '@/assets';
import { BarChartCom, DaySelector, ScreenWrapper, Spacer } from '@/components';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import {UserProfile, UserDetails, Users} from '@/screens/Customers/Components';
import { Table } from 'react-native-table-component';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { useEffect } from 'react';
import {
  getCustomer,
  getOrderUser,
  getUserOrder,
} from '@/actions/CustomersAction';
import { getCustomers } from '@/selectors/CustomersSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/CustomersTypes';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import moment from 'moment';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { useNetInfo } from '@react-native-community/netinfo';
const windowWidth = Dimensions.get('window') * 0.98;

export function Customers() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getCustomerData = useSelector(getCustomers);
  const getCustomerStatitics = getCustomerData?.getCustomers;
  const getAnalyticsData = useSelector(getAnalytics);
  const revenueGraphObject = getAnalyticsData?.getRevenueGraph;
  const userOrderArray = getCustomerData?.getUserOrder;
  const orderUserArray = getCustomerData?.getOrderUser;
  const sellerID = getAuth?.getProfile?.unique_uuid;
  const [weeklyUser, setWeeklyUser] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [userDetail, setUserDetail] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [userStore, setUserStore] = useState('');
  const [orderDetail, setOrderDetail] = useState('');
  const [selectedValue, setSelectedValue] = useState(+5);
  const orderStatus = orderDetail?.status;

  // const revenueGraphObject =

  const selected = value => (
    setSelectedValue(value), dispatch(getUserOrder(sellerID, selectedValue))
  );

  const newCustomerData = [
    {
      customertype: 'New Customers',
      count: getCustomerStatitics?.new_customers,
      img: newCustomer,
      id: '1'
    },
    {
      customertype: 'Returning Customers',
      count: getCustomerStatitics?.returning_customers,
      img: returnCustomer,
      id: '2'
    },
    {
      customertype: 'Online Customers',
      count: getCustomerStatitics?.online_customers,
      img: onlineCutomer,
      id: '3',
    },
    {
      customertype: 'Shipping Customers',
      count: getCustomerStatitics?.shipping_customers,
      img: onlineCutomer,
      id: '4',
    },
  ];

  useEffect(() => {
    if (isFocused) {
      dispatch(getCustomer(sellerID));
    }
  }, [isFocused]);

  const isSearchProLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_USER_ORDER], state)
  );
  const isOrderUserLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_ORDER_USER], state)
  );
  const isCustomerLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_CUSTOMERS], state)
  );
  const userClickHandler = ({ item, sellerID }) => {
    setWeeklyUser(false);
    setUserProfile(!userProfile);
    setUserStore(item);
    dispatch(getOrderUser(item?.user_id, sellerID));
  };

  const newCustomerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.custometrCon}
      onPress={() => (
        setWeeklyUser(!weeklyUser),
        dispatch(getUserOrder(sellerID, selectedValue))
      )}
    >
      <View style={styles.flexAlign}>
        <Image source={item.img} style={styles.newCustomer} />
        <View style={{ paddingHorizontal: moderateScale(7) }}>
          <Text style={styles.customerCount}>{item.count}</Text>
          <Text style={styles.newCustomerHeading}>{item.customertype}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const newCustomerItemLoader = ({ item }) => (
    <View style={styles.custometrCon}>
      <View style={styles.flexAlign}>
        <Image source={item.img} style={styles.newCustomer} />
        <View style={{ paddingHorizontal: moderateScale(7) }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              height: SH(37),
            }}
          >
            <ActivityIndicator size="small" color={COLORS.indicator} />
          </View>
          <Text style={styles.newCustomerHeading}>{item.customertype}</Text>
        </View>
      </View>
    </View>
  );
  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {weeklyUser ? (
          <View style={styles.deliveryView}>
            <TouchableOpacity onPress={() => setWeeklyUser(false)}>
              <Image source={leftBack} style={styles.leftBackStyle} />
            </TouchableOpacity>
            <Image
              source={users}
              style={[styles.truckStyle, { marginLeft: 10 }]}
            />
            <Text style={[styles.deliveryText, { marginTop: 5 }]}>
              {strings.customers.users}
            </Text>
          </View>
        ) : (
          <View style={styles.deliveryView}>
            <Image source={users} style={styles.truckStyle} />
            <Text style={[styles.deliveryText, { marginTop: 5 }]}>
              {strings.customers.customer}
            </Text>
          </View>
        )}
        <View style={styles.deliveryView}>
          <Image
            source={notifications}
            style={[styles.truckStyle, { right: 20 }]}
          />
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
  const customUserHeader = () => {
    return (
      <View style={styles.useHeaderCon}>
        <Spacer space={SH(10)} />
        <View style={styles.displayFlex}>
          <View style={styles.flexAlign}>                                                       
            <TouchableOpacity
              onPress={() => (setUserProfile(false), setWeeklyUser(true))}
            >
              <Image source={leftBack} style={styles.leftBackStyle} />
            </TouchableOpacity>
            <Text style={styles.profileHeaderText}>
              {strings.customers.userprofile}
            </Text>
          </View>
          <View style={styles.editButtonCon}>
            <Text style={styles.editButtonText}>{strings.customers.Edit}</Text>
          </View>
        </View>
      </View>
    );
  };

  const bodyView = () => {
    if (tracking) {
      return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
          <Spacer space={SH(10)} />
          <View style={styles.onlinedeliveryCon}>
            <View
              style={[
                styles.displayFlex,
                { paddingHorizontal: moderateScale(10) },
              ]}
            >
              <View style={styles.flexAlign}>
                <TouchableOpacity
                  onPress={() => (setTracking(false), setOrderModal(true))}
                >
                  <Image source={leftBack} style={styles.leftBackStyle} />
                </TouchableOpacity>
                <Text style={styles.orderNoStyle}>
                  {strings.trackingNumber.trackingNo}
                </Text>
                <View style={styles.completedButton}>
                  <Text style={styles.completedText}>
                    {strings.customers.completed}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => (setTracking(false), setOrderModal(true))}
              >
                <Image source={crossButton} style={styles.leftBackStyle} />
              </TouchableOpacity>
            </View>
          </View>
          <Spacer space={SH(12)} />
          <View style={styles.trackingNoBody}>
            <View>
              <Spacer space={SH(10)} />
              <View style={[styles.displayFlex, { alignItems: 'flex-start' }]}>
                <View style={[styles.mapContainer, styles.mapConatinerHeight]}>
                  <View style={[styles.costoContainer]}>
                    <Spacer space={SH(10)} />
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={
                          orderDetail?.seller_details?.profile_photo
                            ? {
                                uri: orderDetail?.seller_details?.profile_photo,
                              }
                            : userImage
                        }
                        style={styles.trackingAngela}
                      />
                      <View>
                        <Text style={styles.costoName}>
                          {orderDetail?.seller_details?.firstname}
                        </Text>
                        <Spacer space={SH(7)} />
                        <View style={styles.flexAlign}>
                          <Image source={location} style={styles.Phonelight} />
                          <Text style={styles.costoAdd}>
                            {strings.customers.costoAdd}
                          </Text>
                        </View>
                        <View style={styles.costoHr}></View>
                        <View style={styles.flexAlign}>
                          <View style={styles.costoPayCon}>
                            <View style={styles.flexAlign}>
                              <Image
                                source={ticket}
                                style={styles.ticketImage}
                              />
                              <Text style={styles.ciagrtext}>
                                ${orderDetail?.payable_amount}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={[
                              styles.costoPayCon,
                              { alignItems: 'center' },
                            ]}
                          >
                            <View style={styles.flexAlign}>
                              <Image source={box} style={styles.ticketImage} />
                              <Text style={styles.ciagrtext}>
                                4 boxes Cigar
                              </Text>
                            </View>
                          </View>
                          <View style={styles.flexAlign}>
                            <Text style={styles.detailText}>
                              {strings.customers.detail}
                            </Text>
                            <Image
                              source={dropRight}
                              style={styles.dropRight}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Spacer space={SH(10)} />
                  <View style={{ paddingHorizontal: moderateScale(18) }}>
                    <Text style={styles.orderStatus}>
                      {strings.customers.orderStatus}
                    </Text>
                    <Text
                      style={[
                        styles.orderStatus,
                        { fontFamily: Fonts.Regular },
                      ]}
                    >
                      {strings.customers.assignDriver}
                    </Text>
                    <View
                      style={[
                        styles.costoHr,
                        { marginVertical: verticalScale(8) },
                      ]}
                    />
                    <Spacer space={SH(5)} />
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flexDirection: 'column' }}>
                        <View style={styles.greyRadioCon}>
                          <Image
                            source={
                              orderStatus >= 6 ? radioArrBlue : greyRadioArr
                            }
                            style={styles.greyRadioArr}
                          />
                          <View style={styles.greyRadioBody}>
                            <Text
                              style={
                                orderStatus >= 6
                                  ? styles.verifyTextDark
                                  : styles.verifyTextLight
                              }
                            >
                              {strings.customers.delivery}
                            </Text>
                            <Spacer space={SH(5)} />
                            <Text style={styles.waitMinuteLight}>
                              {strings.customers.waitMinute}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.greyRadioCon}>
                          <Image
                            source={
                              orderStatus >= 5 ? radioArrBlue : greyRadioArr
                            }
                            style={styles.greyRadioArr}
                          />
                          <View style={styles.greyRadioBody}>
                            <Text
                              style={
                                orderStatus >= 5
                                  ? styles.verifyTextDark
                                  : styles.verifyTextLight
                              }
                            >
                              {strings.customers.productPick}
                            </Text>
                            <Spacer space={SH(5)} />
                            <Text style={styles.waitMinuteLight}>
                              {strings.customers.waitMinute}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.greyRadioCon}>
                          <Image
                            source={
                              orderStatus >= 4 ? radioArrBlue : greyRadioArr
                            }
                            style={styles.greyRadioArr}
                          />
                          <View style={styles.greyRadioBody}>
                            <Text
                              style={
                                orderStatus >= 4
                                  ? styles.verifyTextDark
                                  : styles.verifyTextLight
                              }
                            >
                              {strings.customers.assignDriver}
                            </Text>
                            <Spacer space={SH(5)} />
                            <Text style={styles.waitMinuteLight}>
                              {strings.customers.waitMinute}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.greyRadioCon}>
                          <Image
                            source={
                              orderStatus >= 3 ? radioArrBlue : greyRadioArr
                            }
                            style={styles.greyRadioArr}
                          />
                          <View style={styles.greyRadioBody}>
                            <Text
                              style={
                                orderStatus >= 3
                                  ? styles.verifyTextDark
                                  : styles.verifyTextLight
                              }
                            >
                              {strings.customers.readyPickup}
                            </Text>
                            <Spacer space={SH(5)} />
                            <Text style={styles.waitMinuteLight}>
                              {strings.customers.waitMinute}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.greyRadioCon}>
                          <Image
                            source={
                              orderStatus >= 1 ? radioArrBlue : greyRadioArr
                            }
                            style={styles.greyRadioArr}
                          />
                          <View style={styles.greyRadioBody}>
                            <Text
                              style={
                                orderStatus >= 1
                                  ? styles.verifyTextDark
                                  : styles.verifyTextLight
                              }
                            >
                              {strings.customers.orderAccepted}
                            </Text>
                            <Spacer space={SH(5)} />
                            <Text style={styles.waitMinuteLight}>
                              {strings.customers.waitMinute}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.greyRadioCon}>
                          <Image
                            source={
                              orderStatus >= 0 ? radioArrBlue : greyRadioArr
                            }
                            style={styles.greyRadioArr}
                          />
                          <View style={styles.greyRadioBody}>
                            <Text
                              style={
                                orderStatus >= 0
                                  ? styles.verifyTextDark
                                  : styles.verifyTextLight
                              }
                            >
                              {strings.customers.orderReview}
                            </Text>
                            <Spacer space={SH(5)} />
                            <Text style={styles.waitMinuteLight}>
                              {strings.customers.waitMinute}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <Spacer space={SH(10)} />
                    {/* <View style={{ flex: 1 }} /> */}
                    <View style={styles.carriarCon}>
                      <Spacer space={SH(5)} />
                      <Text
                        style={[
                          styles.verifyTextLight,
                          { color: COLORS.black },
                        ]}
                      >
                        {strings.customers.carriar}
                      </Text>
                      <Spacer space={SH(8)} />
                      <View style={styles.displayFlex}>
                        <View style={styles.flexAlign}>
                          <Image
                            source={angela2}
                            style={styles.tracking2Angela}
                          />
                          <Text style={styles.gredoName}>
                            {strings.customers.geredo}
                          </Text>
                        </View>
                        <View style={styles.contactButton}>
                          <View
                            style={[
                              styles.flexAlign,
                              { paddingHorizontal: moderateScale(12) },
                            ]}
                          >
                            <Image
                              source={contact}
                              style={styles.contactStyle}
                            />
                            <Text style={styles.contactText}>
                              {strings.customers.contact}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Spacer space={SH(8)} />
                    </View>
                  </View>
                </View>
                <View style={styles.mapContainer2}>
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    showCompass
                    region={{
                      latitude: orderDetail?.seller_details?.seller_location?.[0],
                      longitude: orderDetail?.seller_details?.seller_location?.[1],
                      latitudeDelta: 0.09,
                      longitudeDelta: 0.09,
                    }}
                    style={styles.map}
                  >
                    <Marker
                      coordinate={{
                        latitude: orderDetail?.seller_details?.seller_location?.[0]
                          ? orderDetail?.seller_details?.seller_location?.[0]
                          : 0,
                        longitude: orderDetail?.seller_details?.seller_location?.[1]
                          ? orderDetail?.seller_details?.seller_location?.[1]
                          : 0,
                      }}
                      image={shop_light}
                      style={{ width: 8, height: 8 }}
                    ></Marker>
                    <Marker
                      coordinate={{
                        latitude: orderDetail?.coordinates?.[0]
                          ? orderDetail?.coordinates?.[0]
                          : 0,
                        longitude: orderDetail?.coordinates?.[1]
                          ? orderDetail?.coordinates?.[1]
                          : 0,
                      }}
                      
                      image={blueLocation}
                      style={{ width: 8, height: 8 }}
                    >
                    </Marker>
                  </MapView>
                </View>
              </View>
              <Spacer space={SH(12)} />
            </View>
          </View>
        </View>
      );
    } else if (orderModal) {
      return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
          <Spacer space={SH(10)} />
          <View style={styles.onlinedeliveryCon}>
            <View
              style={[
                styles.displayFlex,
                { paddingHorizontal: moderateScale(10) },
              ]}
            >
              <View style={styles.flexAlign}>
                <TouchableOpacity
                  onPress={() => (setOrderModal(false), setUserProfile(true))}
                >
                  <Image source={leftBack} style={styles.leftBackStyle} />
                </TouchableOpacity>
                <Text style={styles.orderNoStyle}>
                  {strings.wallet.orderNo}
                  {orderDetail?.id}
                </Text>
                <View style={styles.completedButton}>
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => (setOrderModal(false), setUserProfile(true))}
              >
                <Image source={crossButton} style={styles.leftBackStyle} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Spacer space={SH(10)} />
            <View style={styles.onlinedeliveryBody}>
              <View style={styles.displayFlex}>
                <View style={styles.buyerCon}>
                  <Spacer space={SH(5)} />
                  <Text style={styles.buyer}>{strings.wallet.buyer}</Text>
                  <Spacer space={SH(5)} />
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={
                        userStore?.user_details?.profile_photo
                          ? { uri: userStore?.user_details?.profile_photo }
                          : userImage
                      }
                      style={styles.angelaPic}
                    />
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={styles.angela}>
                        {userStore?.user_details?.firstname}
                      </Text>
                      <Spacer space={SH(5)} />
                      <Text style={styles.angelaAddress} numberOfLines={1}>
                        {
                          userStore?.user_details?.current_address
                            ?.street_address
                        }
                        ,{userStore?.user_details?.current_address?.city},
                        {userStore?.user_details?.current_address?.state},
                        {userStore?.user_details?.current_address?.country},
                        {userStore?.user_details?.current_address?.postal_code},
                      </Text>
                      <Text style={styles.angelaAddress}>
                        {strings.wallet.angelaAddress2}
                        {userStore?.user_details?.phone_number}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.invoiceCon}>
                  <Spacer space={SH(4)} />
                  <Text style={styles.invoiceDetail}>
                    {strings.wallet.invoiceDetails}
                  </Text>
                  <Spacer space={SH(4)} />
                  <Text style={styles.invoiceId}>
                    {strings.wallet.invoiceIdLabel}
                    <Text style={{ color: COLORS.solid_grey }}>
                      {strings.wallet.invoiceId}
                    </Text>
                  </Text>
                  <Spacer space={SH(3)} />
                  <Text style={styles.invoiceId}>
                    {strings.wallet.createDateLabel}
                    <Text style={{ color: COLORS.solid_grey }}>
                      {strings.wallet.createDate}
                    </Text>
                  </Text>
                  <Spacer space={SH(3)} />
                  <Text style={styles.invoiceId}>
                    {strings.wallet.dueDateLabel}
                    <Text style={{ color: COLORS.solid_grey }}>
                      {strings.wallet.createDate}
                    </Text>
                  </Text>
                  <Spacer space={SH(3)} />
                  <Text style={styles.deliveryDate}>
                    {strings.wallet.deliveryDate}{' '}
                    <Text>{strings.wallet.createDate}</Text>
                  </Text>
                  <View style={styles.pointConOrder}>
                    <Text style={styles.pointTextOrder}>
                      {strings.wallet.point}
                    </Text>
                  </View>
                </View>
              </View>
              <Spacer space={SH(15)} />
              <View style={styles.tableContainer}>
                <Table>
                  <View
                    style={[
                      styles.tableDataHeaderCon,
                      styles.tableheaderRadius,
                    ]}
                  >
                    <View style={styles.displayFlex}>
                      <View style={styles.tableHeaderLeft}>
                        <Text style={styles.tableTextHeaFirst}>#</Text>
                        <Text style={[styles.tableTextHea, { marginLeft: 30 }]}>
                          Descriptions
                        </Text>
                      </View>
                      <View style={styles.tableHeaderRightOrder}>
                        <Text style={styles.tableTextHea}>No. of Items</Text>
                        <Text style={styles.tableTextHea}>Rate</Text>
                        <Text
                          style={[styles.tableTextHea, { marginRight: -35 }]}
                        >
                          Amount
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ height: SH(120) }}>
                    <ScrollView>
                      {orderDetail?.order_details.map((item, index) => (
                        <View style={styles.tableDataCon} key={index}>
                          <View style={styles.displayFlex}>
                            <View style={styles.tableHeaderLeft}>
                              <Text style={styles.tableTextDataFirst}>
                                {index + 1}
                              </Text>
                              <View
                                style={{ flexDirection: 'row', marginLeft: 30 }}
                              >
                                {item.product_image ? (
                                  <Image
                                    source={{ uri: item.product_image }}
                                    style={styles.orderCigrate}
                                  />
                                ) : null}
                                <View
                                  style={{
                                    flexDirection: 'column',
                                    marginLeft: 8,
                                  }}
                                >
                                  <Text style={styles.tableTextData}>
                                    {item.product_name}
                                  </Text>
                                  <Text
                                    style={[
                                      styles.tableTextData,
                                      { color: COLORS.gerySkies },
                                    ]}
                                  >
                                    Box of {item.qty}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <View style={styles.tableHeaderRightOrder}>
                              <Text style={styles.tableTextData}>
                                {item.qty} Box
                              </Text>
                              <Text style={styles.tableTextData}>
                                ${item.price}
                              </Text>
                              <Text
                                style={[
                                  styles.tableTextData,
                                  { marginRight: -35 },
                                ]}
                              >
                                ${item.qty * item.price}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                </Table>

                <Spacer space={SH(10)} />
                <View
                  style={[
                    styles.displayFlex,
                    { marginHorizontal: moderateScale(10) },
                  ]}
                >
                  <TextInput
                    multiline
                    editable={false}
                    numberOfLines={4}
                    style={styles.textInputStyle}
                    placeholder="Note:"
                    placeholderTextColor="#000"
                  />
                  <View style={styles.noteContainer}>
                    <Spacer space={SH(12)} />
                    <View style={styles.tablesubTotal}>
                      <Text style={styles.tablesubTotalLabel}>
                        {strings.wallet.subtotal}
                      </Text>
                      <Text style={styles.tablesubTotalText}>
                        $
                        {orderDetail?.actual_amount
                          ? orderDetail?.actual_amount
                          : '0'}
                      </Text>
                    </View>
                    <View style={styles.subtotalHr}></View>
                    <View style={styles.tablesubTotal}>
                      <Text style={styles.tablesubTotalLabel}>
                        {strings.wallet.serviceCharge}
                      </Text>
                      <Text style={styles.tablesubTotalText}>
                        ${orderDetail?.tax ? orderDetail?.tax : '0'}
                      </Text>
                    </View>
                    <View style={styles.subtotalHr}></View>
                    <View style={styles.tablesubTotal}>
                      <Text style={styles.tablesubTotalLabel}>
                        {strings.wallet.discount}
                      </Text>
                      <Text
                        style={[
                          styles.tablesubTotalText,
                          { color: COLORS.roseRed },
                        ]}
                      >
                        ${orderDetail?.discount ? orderDetail?.discount : '0'}
                      </Text>
                    </View>
                    <View style={styles.subtotalHr}></View>
                    <View style={styles.tablesubTotal}>
                      <Text style={styles.tablesubTotalLabel}>
                        {strings.wallet.shippingCharge}
                      </Text>
                      <Text style={styles.tablesubTotalText}>${'0'}</Text>
                    </View>
                    <View style={styles.subtotalHr}></View>
                    <View style={styles.tablesubTotal}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Text
                          style={[
                            styles.tablesubTotalLabel,
                            { fontFamily: Fonts.SemiBold },
                          ]}
                        >
                          {strings.wallet.total}
                        </Text>
                        <View style={styles.paidContainer}>
                          <Text style={styles.paidText}>
                            {strings.wallet.paid}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.tablesubTotalText}>
                        $
                        {orderDetail?.payable_amount
                          ? orderDetail?.payable_amount
                          : '0'}
                      </Text>
                    </View>
                    <Spacer space={SH(10)} />
                  </View>
                </View>
                <Spacer space={SH(20)} />
              </View>
              <Spacer space={SH(10)} />
              <View>
                <Text style={styles.shippingDetail}>
                  {strings.wallet.shippingDetail}
                </Text>
              </View>
              <Spacer space={SH(10)} />
              <View style={styles.trackingCon}>
                <View style={styles.displayFlex}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={willis} style={styles.willis} />
                    <View>
                      <Text style={styles.willisName}>
                        {strings.wallet.willis}
                      </Text>
                      <Text style={styles.trackingNumber}>
                        {strings.wallet.trackingNo}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={[
                        styles.deliverBtnCon,
                        { marginHorizontal: moderateScale(8) },
                      ]}
                    >
                      <View style={styles.deliverTextCon}>
                        <Image
                          source={deliverCheck}
                          style={styles.deliveryCheck}
                        />
                        <Text style={styles.deliveredText}>
                          {strings.wallet.delivered}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={[styles.deliverBtnCon, styles.trackingBtnCon]}
                      onPress={() => (setTracking(true), setOrderModal(false))}
                    >
                      <View style={styles.deliverTextCon}>
                        <Image source={track} style={styles.deliveryCheck} />
                        <Text style={styles.deliveredText}>
                          {strings.wallet.tracking}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Spacer space={SH(20)} />
            </View>
          </View>
        </View>
      );
    } else if (userDetail) {
      return (
        <View>
          <UserDetails
            userName={userStore?.user_details?.firstname}
            userProfile={userStore?.user_details?.profile_photo}
            userPhoneNumber={userStore?.user_details?.phone_number}
            userEmail={userStore?.user_details?.email}
            userAddress={userStore?.user_details?.current_address}
            userRemoveRemoveHandler={() => (
              setUserDetail(false), setUserProfile(true)
            )}
          />
        </View>
      );
    } else if (userProfile) {
      return (
        <View>
          {customUserHeader()}
          <UserProfile
            userName={userStore?.user_details?.firstname}
            userProfile={userStore?.user_details?.profile_photo}
            userPhoneNumber={userStore?.user_details?.phone_number}
            userAddress={userStore?.user_details?.current_address}
            userEmail={userStore?.user_details?.email}
            userDetailHandler={() => (
              setUserProfile(false), setUserDetail(true)
            )}
          />
          {isOrderUserLoading ? (
            <View style={{ marginTop: 100 }}>
              <ActivityIndicator size="large" color={COLORS.indicator} />
            </View>
          ) : orderUserArray.length === 0 ? (
            <View style={{ marginTop: 80 }}>
              <Text style={styles.userNotFound}>Order not found</Text>
            </View>
          ) : (
            orderUserArray.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.tableDataCon, { zIndex: -99 }]}
                onPress={() => (
                  setOrderModal(true),
                  setUserProfile(false),
                  setOrderDetail(item)
                )}
              >
                <View style={styles.displayFlex}>
                  <View style={styles.tableHeaderLeftPro}>
                    <Text style={styles.tableTextDataFirst}>{index + 1}</Text>
                  </View>
                  <View style={styles.tableHeaderRightPro}>
                    <Text style={styles.tableTextData}>{item.id}</Text>
                    <Text style={styles.tableTextData}>
                      {item.date
                        ? moment(item.date).format('LL')
                        : 'date not found'}
                    </Text>
                    <Text style={styles.tableTextData}>Maimi</Text>
                    <Text style={styles.tableTextData}>DHL</Text>
                    <Text style={styles.tableTextData}>
                      {item.total_items} times
                    </Text>
                    <Text style={styles.tableTextData}>
                      ${item.payable_amount}
                    </Text>
                    <View
                      style={[
                        styles.saleTypeView,
                        {
                          backgroundColor:
                            item.shipping === 'Delivery' ||
                            item.shipping === 'Shipping'
                              ? COLORS.marshmallow
                              : COLORS.lightGreen,
                        },
                      ]}
                    >
                      <Text style={styles.saleTypeText}>{item.shipping}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      );
    } else if (weeklyUser) {
      return (
        <View>
          {customHeader()}
          <Users selectedNo={selected} />
          {isSearchProLoading ? (
            <View style={{ marginTop: 100 }}>
              <ActivityIndicator size="large" color={COLORS.indicator} />
            </View>
          ) : userOrderArray?.length === 0 ? (
            <View style={{ marginTop: 80 }}>
              <Text style={styles.userNotFound}>User not found</Text>
            </View>
          ) : (
            userOrderArray?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.tableDataCon, { zIndex: -99 }]}
                activeOpacity={0.7}
                onPress={() => userClickHandler({ item, sellerID })}
              >
                <View style={styles.displayFlex}>
                  <View style={styles.tableHeaderLeft}>
                    <Text style={styles.tableTextDataFirst}>{index + 1}</Text>
                    <View style={[styles.flexAlign, { marginLeft: 25 }]}>
                      <Image
                        source={
                          item?.user_details?.profile_photo
                            ? { uri: item?.user_details?.profile_photo }
                            : userImage
                        }
                        style={styles.lovingStyleData}
                      />
                      <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                        <Text style={styles.tableTextDataName}>
                          {item?.user_details?.firstname}
                        </Text>
                        {item?.user_details ? (
                          <Text
                            style={[
                              styles.tableTextDataAdd,
                              { color: COLORS.gerySkies },
                            ]}
                            numberOfLines={1}
                          >
                            {
                              item?.user_details?.current_address
                                ?.street_address
                            }
                            ,{item?.user_details?.current_address?.city},
                            {item?.user_details?.current_address?.state},
                            {item?.user_details?.current_address?.country},
                            {item?.user_details?.current_address?.postal_code},
                          </Text>
                        ) : (
                          <Text></Text>
                        )}
                      </View>
                    </View>
                  </View>
                  <View style={styles.tableHeaderRight}>
                    <Text style={styles.tableTextData}>
                      {item?.total_orders}
                    </Text>
                    <Text style={styles.tableTextData}>
                      {item?.total_products}
                    </Text>
                    <Text style={styles.tableTextData}>
                      {item?.life_time_spent?.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      );
    } else {
      return (
        <View>
          {customHeader()}
          <View style={styles.customerHomeCon}>
            <View>
              <View>
                {isCustomerLoading ? (
                  <FlatList
                    data={newCustomerDataLoader}
                    renderItem={newCustomerItemLoader}
                    keyExtractor={item => item.id}
                    horizontal
                    contentContainerStyle={styles.contentContainerStyle}
                  />
                ) : (
                  <FlatList
                    data={newCustomerData}
                    renderItem={newCustomerItem}
                    keyExtractor={item => item.id}
                    horizontal
                    contentContainerStyle={styles.contentContainerStyle}
                  />
                )}
              </View>
              <Spacer space={SH(15)} />
              <View style={styles.displayFlex}>
                <Text style={styles.trancationHeading}>
                  {strings.customers.totalCustomer}
                </Text>
                <View>
                  <DaySelector />
                </View>
              </View>
              <Spacer space={SH(5)} />
              <Text style={styles.totalCustomer}>
                {strings.customers.customerCount}
              </Text>
              {/* <Spacer space={SH(10)} />
              <Image source={customersGraph} style={styles.customersGraph} />
              <Spacer space={SH(200)} /> */}
              <View style={{marginTop:30}}>
                <Image source={cusBarClr} style={styles.cusBarClr}/>
              <BarChartCom
               barWid={Platform.OS === 'android' ?  SH(1250) : SH(930)}
               barHei={300}
               barSpacing={Platform.OS === 'android' ?  94 : 60}
               barW={20}
               labelTextSty= {{color: COLORS.gerySkies, fontSize:11}}
               revenueData = {revenueGraphObject}
               />
              </View>
            </View>
          </View>
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
