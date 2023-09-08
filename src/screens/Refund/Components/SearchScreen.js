import React, { useRef, useState } from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Platform,
  ActivityIndicator,
} from 'react-native';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale, ms } from 'react-native-size-matters';

import {
  clock,
  Fonts,
  iImage,
  pay,
  PaymentDone,
  pin,
  research,
  rightIcon,
  scn,
  scooter,
  search_light,
  userImage,
} from '@/assets';
import Header from './Header';
import { Spacer } from '@/components';
import ManualEntry from './ManualEntry';
import { strings } from '@/localization';
import ProductRefund from './ProductRefund';
import { COLORS, SF, SH, SW } from '@/theme';
import { DASHBOARDTYPE } from '@/Types/DashboardTypes';
import RecheckConfirmation from './RecheckConfirmation';
import { getDashboard } from '@/selectors/DashboardSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getOrdersByInvoiceId } from '@/actions/DashboardAction';
import { useEffect } from 'react';

const windowWidth = Dimensions.get('window').width;
const newArray = [];

export function SearchScreen() {
  const textInputRef = useRef();
  const dispatch = useDispatch();
  const getSearchOrders = useSelector(getDashboard);
  const order = getSearchOrders?.invoiceSearchOrders;

  const [sku, setSku] = useState();
  const [orders, setOrders] = useState();
  const [productsVerified, setProductsVerified] = useState();
  const [isVisibleManual, setIsVisibleManual] = useState(false);
  const [showProductRefund, setShowProductRefund] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);
  const [isCheckConfirmationModalVisible, setIsCheckConfirmationModalVisible] = useState(false);

  useEffect(() => {
    if (order) {
      setOrderDetail(order?.order?.order_details);
    }
  }, [getSearchOrders?.invoiceSearchOrders?.length > 0]);

  const getDeliveryType = (type) => {
    switch (type) {
      case '1':
        return 'Delivery';
      case '3':
        return 'In-store';
      case '4':
        return 'Shipping';
      default:
        return 'Reservation';
    }
  };

  const renderOrderProducts = ({ item }) => {
    console.log(item.check);
    return (
      <View style={styles.orderproductView}>
        <View style={[styles.shippingOrderHeader, { paddingTop: 0 }]}>
          <Image
            source={item?.product_image ? { uri: item?.product_image } : userImage}
            style={styles.userImageStyle}
          />
          <View style={{ paddingLeft: 10, width: ms(100) }}>
            <Text numberOfLines={1} style={[styles.nameTextStyle, { textAlign: 'left' }]}>
              {item?.product_name ?? '-'}
            </Text>
            {item?.variant ? (
              <Text
                style={styles.varientTextStyle}
              >{`Color: ${item?.color} / Size: ${item?.size}`}</Text>
            ) : null}
          </View>
        </View>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>
          {`$${item?.price}` ?? '-'}
        </Text>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>{item?.qty ?? '-'}</Text>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>
          {`$${item?.actual_price}` ?? '-'}
        </Text>

        {item?.isChecked ? (
          <View>
            <Image
              source={PaymentDone}
              style={[styles.infoIconStyle, { tintColor: COLORS.primary }]}
            />
          </View>
        ) : (
          <View style={styles.infoIconView}>
            <Image source={iImage} style={styles.infoIconStyle} />
          </View>
        )}
      </View>
    );
  };

  // console.log('order----', JSON.stringify(order?.order?.order_details));

  const cartHandler = (item) => {
    const getArray = orderDetail.findIndex((attr) => attr?.product_id === item?.id);
    if (getArray !== -1) {
      const newProdArray = [...orderDetail];
      newProdArray[getArray].isChecked = true;
      setOrderDetail(newProdArray);
    } else {
      alert('Product not found in the order');
    }
  };

  const onSearchInvoiceHandler = (text) => {
    setSku(text);
    if (text) {
      dispatch(getOrdersByInvoiceId(text));
    }
  };

  const isLoading = useSelector((state) =>
    isLoadingSelector([DASHBOARDTYPE.GET_ORDERS_BY_INVOICE_ID], state)
  );

  return (
    <View style={styles.container}>
      {!showProductRefund ? (
        <>
          <Header />
          <Spacer space={SH(20)} />
          <View style={styles.leftViewStyle}>
            <View style={styles.textInputMainViewStyle}>
              <View style={styles.inputWraper}>
                <View style={styles.displayRow}>
                  <Image source={search_light} style={styles.searchStyle} />
                  <TextInput
                    value={sku}
                    ref={textInputRef}
                    style={styles.searchInput}
                    placeholder={'Search invoice here'}
                    onChangeText={onSearchInvoiceHandler}
                  />
                </View>
                <TouchableOpacity onPress={() => textInputRef.current.focus()}>
                  <Image source={scn} style={styles.scnStyle} />
                </TouchableOpacity>
              </View>

              <Spacer space={SH(25)} />
              {isLoading ? (
                <View style={styles.loader}>
                  <ActivityIndicator color={COLORS.primary} style={styles.loader} />
                </View>
              ) : Object.keys(order).length > 0 ? (
                <View style={styles.orderRowStyle}>
                  <Text style={styles.invoiceNumberTextStyle}>
                    {`#${order?.invoice_number}` ?? '-'}
                  </Text>

                  <View style={styles.orderDetailStyle}>
                    <Text style={styles.nameTextStyle}>
                      {order?.order?.user_details
                        ? `${order?.order?.user_details?.user_profiles?.firstname} ${order?.order?.user_details?.user_profiles?.lastname}`
                        : '-'}
                    </Text>

                    {order?.order?.delivery_option !== '3' ? (
                      <View style={styles.locationViewStyle}>
                        <Image source={pin} style={styles.pinImageStyle} />
                        <Text style={styles.distanceTextStyle}>{order?.distance ?? '-'}</Text>
                      </View>
                    ) : (
                      <View style={[styles.locationViewStyle, { justifyContent: 'center' }]}>
                        <Text style={styles.nameTextStyle}>{'-'}</Text>
                      </View>
                    )}
                  </View>

                  <View style={[styles.orderDetailStyle, { paddingHorizontal: 2 }]}>
                    <Text style={styles.nameTextStyle}>{order?.order?.total_items ?? '-'}</Text>
                    <View style={[styles.locationViewStyle, { justifyContent: 'center' }]}>
                      <Image source={pay} style={styles.pinImageStyle} />
                      <Text style={styles.distanceTextStyle}>
                        {order?.order?.payable_amount ?? '-'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.orderDetailStyle}>
                    <Text style={styles.timeTextStyle}>{'Customer'}</Text>
                    <View style={styles.locationViewStyle}>
                      <Image source={clock} style={styles.pinImageStyle} />
                      <Text style={styles.distanceTextStyle}>
                        {getDeliveryType(order?.order?.delivery_option)}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.orderDetailStyle, { width: SH(24) }]}>
                    <Image source={rightIcon} style={styles.rightIconStyle} />
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.SemiBold,
                      fontSize: SF(20),
                      color: COLORS.primary,
                    }}
                  >
                    {'No order found'}
                  </Text>
                </View>
              )}
            </View>

            <View style={{ flex: 0.48 }}>
              {Object.keys(order).length > 0 ? (
                <View
                  style={{
                    borderRadius: 10,
                    flex: 1,
                    marginBottom: ms(10),
                    backgroundColor: COLORS.white,
                  }}
                >
                  <View style={styles.orderDetailViewStyle}>
                    <View style={[styles.locationViewStyle, { flex: 1 }]}>
                      <Image
                        source={
                          order?.order?.user_details?.user_profiles?.profile_photo
                            ? { uri: order?.order?.user_details?.user_profiles?.profile_photo }
                            : userImage
                        }
                        style={styles.userImageStyle}
                      />

                      <View style={styles.userNameView}>
                        <Text style={[styles.totalTextStyle, { padding: 0 }]}>{'Customer'}</Text>
                      </View>
                    </View>

                    <View style={[styles.locationViewStyle, { flex: 0.55 }]}>
                      <Image source={scooter} style={styles.scooterImageStyle} />

                      <View style={[styles.userNameView, { paddingLeft: 5 }]}>
                        <Text style={styles.orderTypeStyle}>
                          {getDeliveryType(order?.order?.delivery_option)}
                        </Text>
                        <Text style={styles.orderDateText}>
                          {order?.order?.date
                            ? moment(order?.order?.date).format('MM/DD/YYYY')
                            : '-'}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <Spacer space={SH(15)} />
                  <View style={styles.getProductDetailView}>
                    <View style={styles.scanProductView}>
                      <Text style={styles.orderDateText}>
                        {'Scan barcode of each item returned'}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => setIsVisibleManual(true)}
                      style={styles.manualView}
                    >
                      <Text style={styles.orderDateText}>{'Manual Entry'}</Text>
                    </TouchableOpacity>
                  </View>

                  <Spacer space={SH(15)} />
                  <View style={{ height: SH(400) }}>
                    <FlatList
                      scrollEnabled
                      data={order?.order?.order_details ?? []}
                      renderItem={renderOrderProducts}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{ flexGrow: 1, paddingBottom: 130 }}
                    />
                  </View>

                  <View style={styles.orderandPriceView}>
                    <View style={{ paddingLeft: 15, flex: 1 }}>
                      <View>
                        <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                          {strings.shippingOrder.totalItem}
                        </Text>
                        <Text style={styles.itemCountText}>{order?.order?.total_items ?? '0'}</Text>
                      </View>

                      <Spacer space={SH(15)} />
                      <View>
                        <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                          {strings.shippingOrder.orderDate}
                        </Text>
                        <Text style={styles.itemCountText}>
                          {order?.order?.date
                            ? moment(order?.order?.date).format('DD/MM/YYYY')
                            : '-'}
                        </Text>
                      </View>

                      <Spacer space={SH(15)} />
                      <View>
                        <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                          {strings.shippingOrder.orderId}
                        </Text>
                        <Text style={styles.itemCountText}>{`#${order?.order?.id}` ?? '-'}</Text>
                      </View>
                    </View>

                    <View style={styles.subTotalView}>
                      <View style={[styles.orderDetailsView, { paddingTop: 0 }]}>
                        <Text style={[styles.invoiceText, { color: COLORS.solid_grey }]}>
                          {strings.deliveryOrders.subTotal}
                        </Text>
                        <Text
                          style={[
                            styles.totalTextStyle,
                            { paddingTop: 0, fontFamily: Fonts.MaisonBold },
                          ]}
                        >
                          ${order?.order?.actual_amount ?? '0'}
                        </Text>
                      </View>

                      <View style={styles.orderDetailsView}>
                        <Text style={styles.invoiceText}>{strings.deliveryOrders.discount}</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.totalTextStyle2}>{'$'}</Text>
                          <Text
                            style={[
                              styles.totalTextStyle,
                              { paddingTop: 0, color: COLORS.darkGray },
                            ]}
                          >
                            {order?.order?.discount ?? '-'}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.orderDetailsView}>
                        <Text style={styles.invoiceText}>{strings.deliveryOrders.otherFees}</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.totalTextStyle2}>{'$'}</Text>
                          <Text
                            style={[
                              styles.totalTextStyle,
                              { paddingTop: 0, color: COLORS.darkGray },
                            ]}
                          >
                            {'0.00'}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.orderDetailsView}>
                        <Text style={styles.invoiceText}>{strings.deliveryOrders.tax}</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.totalTextStyle2}>{'$'}</Text>
                          <Text
                            style={[
                              styles.totalTextStyle,
                              { paddingTop: 0, color: COLORS.darkGray },
                            ]}
                          >
                            {order?.order?.tax}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.horizontalLine} />

                      <View style={styles.orderDetailsView}>
                        <Text style={styles.totalText}>{strings.deliveryOrders.total}</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={[
                              styles.totalTextStyle2,
                              {
                                fontFamily: Fonts.MaisonBold,
                                fontSize: SF(13),
                                color: COLORS.solid_grey,
                              },
                            ]}
                          >
                            {'$'}
                          </Text>
                          <Text style={[styles.totalText, { paddingTop: 0 }]}>
                            {order?.order?.payable_amount ?? '0'}
                          </Text>
                        </View>
                      </View>

                      <Spacer space={SH(15)} />

                      <View style={[styles.locationViewStyle, { justifyContent: 'center' }]}>
                        <TouchableOpacity
                          onPress={() => setIsCheckConfirmationModalVisible(true)}
                          style={[
                            styles.declineButtonStyle,
                            {
                              backgroundColor: productsVerified ? COLORS.primary : COLORS.white,
                              borderWidth: productsVerified ? 0 : 1,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.declineTextStyle,
                              { color: productsVerified ? COLORS.white : COLORS.dark_grey },
                            ]}
                          >
                            {'Return All'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.searchViewStyle}>
                  <Image source={research} style={styles.researchIconstyle} />
                </View>
              )}
            </View>
          </View>
          <ManualEntry
            isVisible={isVisibleManual}
            setIsVisible={setIsVisibleManual}
            onPressCart={cartHandler}
          />
          <RecheckConfirmation
            isVisible={isCheckConfirmationModalVisible}
            setIsVisible={setIsCheckConfirmationModalVisible}
            orderList={orderDetail}
            onPress={() => {
              setIsCheckConfirmationModalVisible(false);
              setShowProductRefund(true);
            }}
          />
        </>
      ) : (
        <ProductRefund backHandler={() => setShowProductRefund(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.textInputBackground,
  },
  inputWraper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    marginHorizontal: ms(10),
    borderWidth: 0.5,
    borderRadius: 7,
    height: ms(35),
    width: windowWidth / 2.3,
    borderColor: COLORS.silver_solid,
    top: 20,
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ms(30),
    width: windowWidth / 2.8,
  },
  searchStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(5),
  },
  searchInput: {
    borderRadius: 7,
    height: ms(20),
    width: windowWidth * 0.4,
    fontFamily: Fonts.Italic,
    padding: 0,
    margin: 0,
  },
  scnStyle: {
    width: SW(16),
    height: SW(17),
    resizeMode: 'contain',
    right: 5,
  },
  searchViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    // width: windowWidth / 2.3,
  },
  researchIconstyle: {
    width: SH(210),
    height: SH(210),
    resizeMode: 'contain',
  },
  textInputMainViewStyle: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flex: 0.5,
    marginBottom: ms(10),
  },
  leftViewStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: ms(10),
  },
  orderRowStyle: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.textInputBackground,
  },
  orderDetailStyle: {
    width: SW(30),
  },
  invoiceNumberTextStyle: {
    fontSize: SF(10),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    textAlignVertical: 'center',
  },
  nameTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    color: COLORS.solid_grey,
    textAlign: 'center',
  },
  locationViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinImageStyle: {
    width: SH(16),
    height: SH(16),
    resizeMode: 'contain',
  },
  timeTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(12),
    color: COLORS.primary,
  },
  distanceTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(9),
    color: COLORS.dark_grey,
    paddingLeft: 5,
  },
  rightIconStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
  },
  orderTypeStyle: {
    fontFamily: Fonts.Bold,
    fontSize: SF(14),
    color: COLORS.primary,
  },
  orderDateText: {
    fontFamily: Fonts.Medium,
    fontSize: SF(11),
    color: COLORS.dark_grey,
  },
  orderDetailViewStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginHorizontal: ms(10),
    paddingVertical: 30,
    borderRadius: 10,
    marginTop: ms(10),
    // width: windowWidth / 2.4,
    backgroundColor: COLORS.textInputBackground,
  },
  userImageStyle: {
    width: SH(36),
    height: SH(36),
    borderRadius: 100,
    resizeMode: 'cover',
  },
  scooterImageStyle: {
    width: SH(26),
    height: SH(26),
    resizeMode: 'contain',
  },
  userNameView: {
    paddingLeft: 10,
    flex: 1,
  },
  orderproductView: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderColor: COLORS.blue_shade,
  },
  totalTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7.2),
    color: COLORS.solid_grey,
    paddingTop: ms(2),
  },
  shippingOrderHeader: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  varientTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.darkGray,
  },
  infoIconView: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 100,
    width: SH(18),
    height: SH(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIconStyle: {
    width: SH(10),
    height: SH(10),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  orderandPriceView: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: ms(5),
    alignSelf: 'center',
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  itemCountText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(12),
    color: COLORS.dark_grey,
  },
  subTotalView: {
    paddingHorizontal: ms(10),
    backgroundColor: COLORS.textInputBackground,
    paddingVertical: ms(8),
    width:
      Platform.OS === 'android'
        ? Dimensions.get('window').width / 5
        : Dimensions.get('window').width / 4.5,
    borderRadius: 10,
  },
  orderDetailsView: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  invoiceText: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(12),
    color: COLORS.darkGray,
  },
  totalTextStyle2: {
    paddingTop: 0,
    fontSize: SF(12),
    lineHeight: ms(8),
    color: COLORS.darkGray,
  },
  totalText: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(18),
    color: COLORS.solid_grey,
  },
  declineButtonStyle: {
    height: SH(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.dark_grey,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    width: ms(120),
    paddingHorizontal: ms(12),
  },
  declineTextStyle: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.dark_grey,
  },
  getProductDetailView: {
    marginHorizontal: ms(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scanProductView: {
    // width: Platform.OS === 'android' ? ms(240) : ms(210),
    paddingVertical: 15,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ms(22),
    backgroundColor: COLORS.blue_shade,
    paddingHorizontal: ms(20),
  },
  manualView: {
    borderWidth: 3,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    paddingHorizontal: ms(22),
    // width: Platform.OS === 'android' ? ms(90) : ms(70),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ms(20),
    borderColor: COLORS.blue_shade,
  },
  horizontalLine: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderStyle: 'dashed',
    marginTop: ms(5),
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
